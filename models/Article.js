let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    title:String,
    subtitle:String,
    author:String,
    content:String,
    tag:String,
    order:Number,
    notes:[{
        target:String,
        note:String,
    }],
    comments:[{
        content:String,
        author:String,
        date:Date,
    }],
});

let Article = mongoose.model('Article', articleSchema);
module.exports = Article;