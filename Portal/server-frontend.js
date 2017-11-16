var express = require('express');
var app = express();
var connect = require('connect');
var socketio = require('socket.io');

var port = process.env.PORT || 9090;
var server = connect(
	connect.static(__dirname + '/public')
).listen(port);

// Puzzle Sockets
var io = socketio.listen(server);
io.sockets.on('connection', function(socket) {	
	socket.emit('getTime');
	socket.on('getTime', function(obj) {
		console.log(new Date().getSeconds());
		socket.emit('getTime', new Date().getSeconds());
	});
});
