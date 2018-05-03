var createError = require('http-errors');
var express = require('express');
require('dotenv').config()

const mongoose = require('mongoose')

const mongoPass = process.env.MONGO_PASS
mongoose.connect(`mongodb://anime_lovers:${mongoPass}@ds263089.mlab.com:63089/group_project_week5`)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('view engine', 'jade')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
