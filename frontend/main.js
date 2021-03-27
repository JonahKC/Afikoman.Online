//Picks a random number from min to max
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var socket = io();
var ownerBk;
//sessionStorage

socket.on('playerData', function(isOwner) {
  console.log("OWNER: " + isOwner);
});

var bk = document.createElement("img");
var matzah = document.createElement("button");

matzah.style.display = "none";
bk.style.display = "none"

const IMAGE_SCALE = [4032, 3024];

window.onload = function(e) {
	socket.emit('join', sessionStorage.getItem('username'), sessionStorage.getItem("jgid"));
	document.getElementById("game").appendChild(bk);
	document.getElementById("game").appendChild(matzah);
}
bk.id = "background";
matzah.id = "matzah";
matzah.setAttribute('class', "invisbutton");
bk.draggable = false;
bk.style.textAlign = "center";
bk.width = IMAGE_SCALE[0] / 4;
bk.height = IMAGE_SCALE[1] / 4;
matzah.style.display = "block";
bk.style.display = "block"

socket.on('playerData', function(isOwner) {
	if(isOwner) {
		ownerBk = `./images/bk_${randInt(1, 3)}_${randInt(0, 3)}.jpg`;
		console.log("BACKGROUND (playerData): " + ownerBk);
		socket.emit('hostbk', ownerBk, sessionStorage.getItem('jgid'));
	}
});
socket.on('hostbkreceive', function(_bk) {
	console.log('BACKGROUND (hostbkreceive): ' + _bk);
	bk.src = _bk;
	console.log('BACKGROUND SOURCE: ' + bk.src)
	matzah.style.display = 'block';
	//document.getElementById("matzah").style.width
});
socket.on('showgame', function() 
{
		console.log("Showgame");
    matzah.style.display = "block";
    bk.style.display = "block"
});
socket.on('win', function(username, winRoom) {
    if(sessionStorage.getItem("room") == winRoom) {
        document.getElementById("win").innerText = username + " has won!";
        document.getElementById("win").style.display = "block";
        document.getElementById("winBk").style.display = "block";
    }
});
matzah.onclick = function() {
		console.log("Matzah clicked");
    socket.emit('win', sessionStorage.getItem("username"), sessionStorage.getItem("room"));
}