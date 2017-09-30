var io = require('socket.io');

exports.initialize = function(server) {
	io = io.listen(server);
	io.sockets.on("connection", function(socket){
		socket.on('message', function(data){
			io.sockets.emit("new message", data);


		});
	});
}