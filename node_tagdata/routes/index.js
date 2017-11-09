var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/top', function(req, res, next) {
    var id = req.body['id'];
    var pass = req.body['password'];

    console.log("[入力された値]  id : " + id + " pass : " + pass);

    //ログイン処理分ける
    if (id == "express" && pass == "password") {
        req.session.id = id;
        req.session.name = "スギヤマ";

        //couchDB からデータを取得
        var data = {
            title: 'Top Page',
            name: req.session.name
        }
        console.log(req.session.name);
        res.render('top', data);
    } else {
        res.render('index', { title: 'Login Error' });
    }

});

module.exports = router;