let mongoose = require('mongoose');
//这里用Mixed类型存储cookie的object
//注意声明Mixed类型时使用了mongoose.Schema.Types.Mixed，而不是直接用Mixed。
let sessionSchema = mongoose.Schema({
    cookie:mongoose.Schema.Types.Mixed,
    userName:String,
    color:String,
    sessionId:String,
});
let Session = mongoose.model('Session', sessionSchema);

module.exports = Session;