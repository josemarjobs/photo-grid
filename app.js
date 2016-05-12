var express = require('express')
var path = require('path')

var app = express()
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('hogan-express'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')))
app.set('port', process.env.PORT || 3000)

require('./routes/routes')(express, app)

var server = require('http').createServer(app)
var io = require('socket.io')(server)

server.listen(app.get('port'), function() {
  console.log('PhotoGRID running at http://localhost:' + app.get('port'))
})
