let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let article = require('../models/Article');

/*控制器独立存在的尝试暂时未成功
* 将控制器模块传递给路由时出错，提示body未定义。
* 现在将控制器功能直接放在路由中。*/
let func = function(req,res,next){
    article.create({
        title:req.body.title,
        author:req.body.author,
        content:req.body.content,
        tag:req.body.tag,
    }, function(err){
        if(err){
            console.err(err);
        }
    });
};

module.exports = func();