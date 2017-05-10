let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let credentials = require('./credentials');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shishuo');

let index = require('./routes/index');
let users = require('./routes/users');
let articleInput = require('./routes/articleInput');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after pl  favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(credentials.cookieSecret));
app.use(require('express-session')({
    resave:true,
    saveUninitialized:true,
    secret:'goodluck',
    cookie:{
        maxAge:60000
    },
    store:new (require('express-sessions'))({
        storage:'mongodb',
        instance:mongoose,
        host:'localhost',
        port:27017,
        db:'shishuo',
        collection:'ses',
        expire:86400,
    }),
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/article', articleInput);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page↑
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;