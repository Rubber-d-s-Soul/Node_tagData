/*データ表示用ページ*/
var express = require('express');
var router = express.Router();

/*couchdb*/
var db = require('./couchdb.js');
/*timestamp用*/
var moment = require("moment");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('data', { title: 'data 一覧表示ページ' });
});

/*ブックデータ登録*/
router.post('/addbook', function(req, res, next) {
    //ajaxで受け取るデータ
    var data = req.body;
    var title = data.title;
    var tags = data['tags[]'];
    var couch = db.couchdb;
    var result = {};
    var status;
    var dbname = "book_db";
    var createtime = moment().format("YYYY/MM/DD HH:mm:ss");

    //couchdbに入れる
    couch.insert(dbname, {
        title: title,
        tags: tags,
        createtime: createtime,
        updatetime: createtime,
    }).then(({ data, headers, status }) => {
        console.log("[couch createDoc SUCCESS]");
        console.log(status);
        status = true;
        url = "/data";
        msg = "DB登録に成功しました"
        result = {
            "status": status,
            "url": url,
            "msg": msg
        };
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

module.exports = router;