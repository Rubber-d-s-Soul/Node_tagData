/*データ表示用ページ*/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('data', { title: 'data 一覧表示ページ' });
});

module.exports = router;