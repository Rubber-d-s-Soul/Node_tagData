/*データ登録用ページ*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('regist', { title: 'data 登録' });
});

module.exports = router;