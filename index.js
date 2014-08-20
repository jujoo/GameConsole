var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var count = 0;

app.use(express.static(__dirname));

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnect');
	});
	socket.on('move', function(msg){
		console.log('move: ' + msg);
		io.emit('move', msg);
	});
});

//app.get('/dynamic', function(req, res){
//	count = count + 1;
// 	res.send('<h1>You are the ' +count + 'st visitor.</h1>');
//});


http.listen(3000, function(){
	console.log('listening on *:3000');
});
