var express = require('express')
, app = express()
, routes = require('./routes')
, path = require('path');
var favicon = require('serve-favicon')
var logger = require('morgan')
var methodOverride = require('method-override')
var session = require('express-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var errorHandler = require('errorhandler')


// all environments
// server.listen(3000);
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname, '/views')
app.set('view engine', 'pug')
// app.set('view engine', 'jade');
app.use(favicon('public/favicon.png'))
app.use(logger('dev'))
app.use(methodOverride())
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer())
app.use(express.static(__dirname + '/public'))


app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
app.get('/users', function(req, res, next) {
  res.send('respond with a resource');
})

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

app.get('/', function(req, res){
	res.render('index', { title: 'Express Chat' });
});
// app.get('/', routes.index);

var server = require('http').createServer(app);
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

//routes.sockets.connect(server);
// require('./routes/sockets.js').initialize(server);



var io = require('socket.io').listen(server); // this tells socket.io to use our express server
io.sockets.on('connection', function(socket) {
	socket.send("Welcome"); 
	socket.on('send message', function(data){
			io.sockets.emit('new message', data); 
			console.log("user message emitted");  
	});
});

// io.sockets.on('connection', function (socket) {
//     console.log('A new user connected!');
//     socket.emit('info', { msg: 'The world is round, there is no up or down.' });
// });
