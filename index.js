var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userid = 0;

app.use(express.static(__dirname)); //인터넷 창에서 html 주소보이게 하는거

io.on('connection', function(socket){

	socket.on('identify', function(msg){
		if (msg === 'viewer'){
			console.log('a viewer connected.');
			this.on('disconnect', function(){
				console.log('viewer disconnect. userid');
			});
		}
		else if (msg === 'controller'){
			userid = userid + 1;
			console.log('a user connected. userid: ' + userid);
			this.userid = userid;

			io.emit('addMario', this.userid);

			this.on('disconnect', function(){
				console.log('controller disconnect. userid' + this.userid);
				io.emit('destroyMario', this.userid);
			});

			this.on('move', function(msg){
				console.log('move: ' +  msg.direction + ', userid: ' + this.userid);
				msg.userid = this.userid;
				io.emit('move', msg);
			});
		}
	});
});

//app.get('/dynamic', function(req, res){
//	count = count + 1;
// 	res.send('<h1>You are the ' +count + 'st visitor.</h1>');
//});


http.listen(3000, function(){
	console.log('listening on *:3000');
});
