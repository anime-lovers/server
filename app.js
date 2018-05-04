const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose')

const mongoPass = process.env.MONGO_PASS
mongoose.connect(`mongodb://anime_lovers:${mongoPass}@ds263089.mlab.com:63089/group_project_week5`)



const app = express();

// view engine setup
app.set('view engine', 'jade')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search')
const detailRouter = require('./routes/detail')
const animelistRouter = require('./routes/animeList')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter)
app.use('/detail', detailRouter)
app.use('/animelist', animelistRouter)

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
