var jgid = document.getElementById("jgid");
var join = document.getElementById("join");
var socket = io();
room = 0;

window.addEventListener("load", function(){
  var md = new MobileDetect(window.navigator.userAgent);
	if(md.mobile() != null) {
		alert("Hi there! It looks like you're on a mobile device. The game isn't optimized for mobile, so some stuff might be cut off. Switch to a computer for the full experience!");
	}
});

//https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
        room = jgid.value;
        sessionStorage.setItem("room", room);
      });
    });
}
setInputFilter(jgid, function(value) {
  return /^\d*?\d*$/.test(value);
});
["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
  document.getElementById("username").addEventListener(event, function() {
    sessionStorage.setItem("username", this.value);
  })
	document.getElementById("jgid").addEventListener(event, function() {
    sessionStorage.setItem("jgid", this.value);
  })
});

/*document.getElementById("joingame").onsubmit = function() {
  socket.emit('join', sessionStorage.getItem("username"), sessionStorage.getItem("room"))
  console.log("Joined");
}*/