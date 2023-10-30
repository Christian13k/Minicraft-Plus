const controls = document.getElementById("controls");
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

controls.style.position = "absolute";
controls.style.pointerEvents = "auto";
controls.style.bottom = "10px";
controls.style.left = "10px";

canvas.style.position = "fixed";
canvas.style.top = "0px";
canvas.style.left = "0px";
canvas.style.background = "#8aebff";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//window.onbeforeunload = function() {
//  return "Seu progresso pode ser perdido se você não salvar :(";
//};

var scriptControls = document.createElement('script');
scriptControls.src = 'game/scripts/game/controls.js';
document.head.appendChild(scriptControls);

var scriptDraw = document.createElement('script');
scriptDraw.src = 'game/scripts/game/draw.js';
document.head.appendChild(scriptDraw);

var scriptPlayer = document.createElement('script');
	scriptPlayer.src = 'game/scripts/game/player.js';
document.head.appendChild(scriptPlayer);