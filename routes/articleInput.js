let express = require('express');
let router = express.Router();
let app = express();
let bodyParser = require('body-parser');
let formidable = require('formidable');
let article = require('../models/Article');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//进入文章录入页面
/*注意，这里的路径不能写具体的，因为要在app中引入，实际上会多一层路径。
* 访问本路由的实际URL是：http://localhost:3000/article/input
* 其中，input在此处设置，article在引用本模块的地方设置*/
router.get('/input', function(req, res, next){
    res.render('articleInput');
});

router.post('/save', function (req,res,next) {
    article.create({
        title:req.body.title,
        author:req.body.author,
        content:req.body.content,
        tag:req.body.tag,
    }, function(err){
        if(err){
            console.err(err);
            }
        }
    );
    res.redirect('/article/input');
    }
);

router.get('/upload', function (req,res,next){
    res.render('articleUpload');
});
router.post('/uploads', function(req,res,next){
    let form = new formidable.IncomingForm();
    form.uploadDir = 'public/upload';                   //文件保存路径
    form.keepExtensions = true;                         //保留文件后缀
    form.multiples = true;                              //多文件上传
    form.parse(req,function(err,fields,files){
        if(err) return res.redirect('/error');
        console.log(req.body.title);
        res.redirect('/article/upload');
    });
});

module.exports = router;