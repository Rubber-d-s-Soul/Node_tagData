var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
    var id = req.body['id'];
    var pass = req.body['password'];
    console.log("[入力された値]  id : " + id + " pass : " + pass);

    //ログイン処理分ける
    if (id == "express" && pass == "password") {
        res.render('login', { title: 'Login' });
    } else {
        res.render('index', { title: 'Login Error' });
    }

});

module.exports = router;