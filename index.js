const PORT = process.env.PORT || 3000
const HOST =  process.env.HOST || "localhost";
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const frontent = path.join(__dirname, 'frontend');

var firstInRoom = {};
var isHost;

app.use(express.static(frontent));
//app.get("/game.html", async function(req, res) {
//    const gameid = req.query.gameid
//    const username = req.query.username
//    res.render("filename", {jgid: jgid, username: username})
//})

io.on('connection', (socket, room) => {
	socket.on('showgame', (rm) => {
		io.to(rm).emit('showgame');
	})
	socket.on('hostbk', (bk, rm) => {
		console.log("BACKGROUND: " + bk);
		console.log("ROOM (SERVER): " + rm)
		io.to(rm).emit('hostbkreceive', bk); // send host bk to all clients
	});
  socket.on('win', (username, room) => {
    for(var i = 0; i < players.length; i++) {
      if(players[i].room = room) {
				players.splice(i, 1)
      }
		}
    io.to(room).emit('win', username);
  });
  socket.on('join', (usr, rm) => {
		if(rm in firstInRoom === false) {
			firstInRoom[rm] += {firstPlayer: 0}
			isHost = true
		} else {
			isHost = false
		}
		console.log(isHost);
		console.log(usr);
		console.log("ROOM: " + rm);
		socket.join(rm);
    //players += {
    //  username: usr,
    //  room: rm,
    //}
		io.to(rm).emit('playerData', isHost, socket.id);
  });
});

http.listen(PORT, () => {
  console.log("listening on " + HOST + ":" + PORT);
});
""