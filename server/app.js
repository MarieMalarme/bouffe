var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

const recipes = require('./routes/recipes')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
// app.use('/users', usersRouter)

app.use('/recipes', recipes)

app.use((request, response, next) => {
  console.log(request)
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  response.header('Access-Control-Allow-Credentials', 'true')
  response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE')
  next()
})

app.use((request, response, next) => {
  console.log('ici', request, response)
  if (request.method !== 'POST' && request.method !== 'PUT') return next()
  let accumulator = ''

  request.on('data', (data) => {
    accumulator += data
    console.log(data)
  })
  request.on('end', () => {
    try {
      request.body = JSON.parse(accumulator)
      console.log(request.body)
      next()
    } catch (err) {
      next(err)
    }
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
