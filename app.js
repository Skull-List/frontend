const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const lessMiddleware = require('less-middleware')
const helmet = require('helmet')

const fs = require('fs')

const indexRouter = require('./routes/index.js')

const app = express()

const config = JSON.parse(fs.readFileSync('./config.json'))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(lessMiddleware(path.join(__dirname, 'static')))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'static')))
app.use(helmet())

app.use('/', indexRouter())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  if (err.status === 404) {
    return res.render('error/404', {
      message: 'Página Não Encontrada!'
    })
  }

  // render the error page
  res.status(err.status || 500)
  res.render('error/default')
})

module.exports = {
  app,
  config
}
