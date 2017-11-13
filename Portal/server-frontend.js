var express = require('express');
var app = express();
var connect = require('connect');
var socketio = require('socket.io');

var port = process.env.PORT || 9090;
var server = connect(
	connect.static(__dirname + '/public')
).listen(port);

// Game sockets
/*var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {
	
	socket.emit('getTime');
	socket.on('getTime', function(obj) {
		socket.emit('getTime', new Date().getSeconds());
	});
});*/