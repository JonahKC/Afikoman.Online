const PORT = process.env.PORT || 3000
const HOST =  process.env.HOST || "localhost";
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const frontent = path.join(__dirname, 'frontend');

//var players = [];
var firstInRoom = {};
var isHost;

app.use(express.static(frontent));
//app.get("/game.html", async function(req, res) {
//    const gameid = req.query.gameid
//    const username = req.query.username
//    res.render("filename", {jgid: jgid, username: username})
//})

io.on('connection', (socket, room) => {
	socket.on('hostbk', (bk) => {
		io.to(room).emit(bk);
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
		/*
			firstInRoom = {
				(roomnumber) "123456": {
					firstPlayer: 0/1
				}
			}
		*/
		if(rm in firstInRoom === false) {
			firstInRoom[rm] += {firstPlayer: 0}
			isHost = true
		} else {
			isHost = false
		}
		console.log(isHost);
		console.log(usr, rm);
    //players += {
    //  username: usr,
    //  room: rm,
    //}
		io.to(rm).emit('playerData', isHost);
  });
});

http.listen(PORT, () => {
  console.log("listening on " + HOST + ":" + PORT);
});
""