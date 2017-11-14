/*データ表示用ページ*/
var express = require('express');
var router = express.Router();

/*couchdb*/
var db = require('./couchdb.js');
var couch = db.couchdb;
/*timestamp用*/
var moment = require("moment");

/* GET home page. */
router.get('/', function(req, res, next) {

    get_tagdata();
    var dbname = "book_db";
    var viewUrl = "_design/book/_view/get_all";
    //couchのbook_dbからデータを取得する
    couch.get(dbname, viewUrl).then(({ data, headers, status }) => {
        console.log("[couchDB " + dbname + " ] get SUCCESS");
        console.log(data);

        var sendData = {
            title: "Book Data",
            data: data.rows,
        }

        res.render('data', sendData);
    }, err => {
        console.log("[couchDB ERROR]");
        console.log(err);
        var data = {
            title: "Book Data",
            msg: "db error"
        }

        res.render('data', data);
    });
});

/*ブックデータ登録*/
router.post('/addbook', function(req, res, next) {
    //ajaxで受け取るデータ
    var data = req.body;
    var title = data.title;
    var author = data.author;
    var tags = data['tags[]'];
    var couch = db.couchdb;
    var result = {};
    var status;
    var dbname = "book_db";
    var createtime = moment().format("YYYY/MM/DD HH:mm:ss");

    //couchdbに入れる
    couch.insert(dbname, {
        title: title,
        author: author,
        tags: tags,
        createtime: createtime,
        updatetime: createtime,
    }).then(({ data, headers, status }) => {
        console.log("[couch createDoc SUCCESS]");
        console.log(status);
        status = true;
        url = "/data";
        msg = "DB登録に成功しました";
        result = {
            "status": status,
            "url": url,
            "msg": msg
        };
        console.log(result);
        res.send(result);
    }, err => {
        console.log("[couch createDoc ERROR]");
        status = false;
        msg = "DB登録に失敗しました"
        result = {
            "status": status,
            "msg": msg
        };
        res.send(result);
    });
});

var taghash;

function get_tagdata() {
    var dbname = "booktag_db";
    var viewUrl = "_design/booktag/_view/get_hash_titlekey";

    couch.get(dbname, viewUrl).then(({ data, headers, status }) => {
        console.log("[couchDB " + dbname + " ] get SUCCESS");
        console.log(data.rows[0].value);

        taghash = data.rows[0].value;

    }, err => {
        console.log("[couchDB ERROR]");
        console.log(err);

        taghash = data.rows.value;
    });
}

module.exports = router;