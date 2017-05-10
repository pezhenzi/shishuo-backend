let express = require('express');
let router = express.Router();
let Session = require('../models/Session');

/*关于cookie的使用
* cookieParser的引入和secret设置要在app中，不在这里。*/
router.get('/', function(req, res, next) {
  //res.cookie('good');
  //res.cookie('signed_name','Libai', {signed:true});
  //req.session.userName = 'Dufu';

  res.render('index', { title: '世说新语',name:req.signedCookies.signed_name,userName:req.session.userName });
});

module.exports = router;
