//Picks a random number from min to max
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var socket = io();
var ownerBk;
var isOwner;

var bk = document.createElement("img");
var matzah = document.createElement("button");

matzah.style.display = "none";
bk.style.display = "none"

const IMAGE_SCALE = [4032, 3024];

bk.id = "background";
matzah.id = "matzah";
matzah.style.zIndex = 1000;
matzah.outline = 'none';

window.onload = function(e) {
	socket.on('showgame', function()
	{
		document.getElementById('player-only').remove();
		document.querySelectorAll('.delete-me').forEach(element => {
			element.remove();
		})
		document.getElementById('after-start').style.display = 'block';
		document.getElementById('game').style.display = 'block';
    matzah.style.display = "block";
		bk.style.display = "block"
		matzah.style.position = 'absolute';
	});
	socket.emit('join', sessionStorage.getItem('username'), sessionStorage.getItem("jgid"));
	document.getElementById("game").appendChild(bk);
	document.getElementById("game").appendChild(matzah);
	document.getElementById('startbutton').onclick = function() {
		socket.emit('hostbk', ownerBk, sessionStorage.getItem('jgid'));
		socket.emit('showgame', sessionStorage.getItem('jgid'));
		document.getElementById('host-only').remove();
	}
	matzah.onclick = function() {
		socket.emit('win', sessionStorage.getItem("username"), sessionStorage.getItem("jgid"));
	}
}
matzah.setAttribute('class', "invisbutton");

matzah.style.position = 'fixed';
matzah.style.textAlign = 'center';
bk.draggable = false;
bk.style.position = "absolute";
bk.style.top = '2in';
bk.style.left = '1in';
bk.style.bottom = '1in';
bk.style.paddingBottom = '1in';
bk.style.paddingRight = '1in';
bk.style.zIndex = 100;
bk.width = IMAGE_SCALE[0] / 4;
bk.height = IMAGE_SCALE[1] / 4;
matzah.style.display = "block";
bk.style.display = "block"

socket.on('playerData', function(_isOwner, id) {
	document.getElementById('id-display').innerText = "ID: " + sessionStorage.getItem('jgid');
	if(id == socket.id) {
		isOwner = _isOwner;
		if(_isOwner) {
			ownerBk = `./images/bk_${randInt(1, 3)}_${randInt(0, 3)}.jpg`;
			document.getElementById('host-only').style.display = 'block';
			//socket.emit('hostbk', ownerBk, sessionStorage.getItem('jgid'));
		} else {
			document.getElementById('player-only').style.display = 'block';
		}
	}
});
socket.on('hostbkreceive', function(_bk) {
	bk.src = _bk;
	matzah.style.width =  (win_button_coords[_bk].width / 4) + 'px';
	matzah.style.height = (win_button_coords[_bk].height / 4) + 'px';
	matzah.style.left =  'calc(' + (win_button_coords[_bk].x / 4) + 'px + 1in)';
	matzah.style.top = 'calc(' + (win_button_coords[_bk].y / 4) + 'px + 2in';
	matzah.style.display = 'block';
});

document.getElementById("returnHome").onclick = function() {
	socket.emit('leaveroom', sessionStorage.getItem('username'), sessionStorage.getItem('jgid'));
	sessionStorage.removeItem('jgid');
	sessionStorage.removeItem('username');
}

document.getElementById("playAgain").onclick = function() {
	socket.emit('resetroom', sessionStorage.getItem('username'), sessionStorage.getItem('jgid'), isOwner);
}


socket.on('wingame', function(username) {
  document.getElementById("win").innerText = username + " has won!";
  document.getElementById("win").style.display = "block";
	matzah.style.display = 'none';
	document.getElementById("returnHome").style.display = "block";
	document.getElementById("playAgain").style.display = "block";
  document.getElementById("winBk").style.display = "block";
});