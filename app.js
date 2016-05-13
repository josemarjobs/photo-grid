var express = require('express')
var path = require('path')
var config = require('./config/config.js')
var knox = require('knox')
var fs = require('fs')
var os = require('os')
var formidable = require('formidable')
var gm = require('gm')


var app = express()
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('hogan-express'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')))
app.set('port', process.env.PORT || 3000)
app.set('host', config.host)

var knoxClient = knox.createClient({
  key: config.S3AccessKey,
  secret: config.S3SecretKey,
  bucket: config.S3Bucket
})
// ROUTES
require('./routes/routes')(express, app, formidable, fs, os, gm, knoxClient)

var server = require('http').createServer(app)
var io = require('socket.io')(server)

server.listen(app.get('port'), function() {
  console.log('PhotoGRID running at http://localhost:' + app.get('port'))
})
