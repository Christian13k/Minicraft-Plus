var play_button = document.getElementById("play-button");
var underneath_menu = document.getElementById("underneath-menu");
var title_menu = document.getElementById("title-menu");
var anchor = document.getElementById("anchor");
var jogo = document.getElementById("jogo");
var blur = document.getElementById("blur");
var loader_in_panorama = document.getElementById("loader-in-panorama");
var title_panorama = document.getElementById("title-panorama");
var script = document.createElement('script');
var exit_button = document.getElementById("exit-button");

play_button.addEventListener('click', function () {
  blur.style.opacity = "100";
  blur.style.display = "block";
  loader_in_panorama.style.display = "block";
  title_menu.style.opacity = "0";
  anchor.scrollIntoView({ behavior: 'smooth' });
  script.src = 'game/scripts/game/game.js';
  document.head.appendChild(script);
  document.title = "Minicraft Plus";
  var audio = document.getElementById("music");
  audio.pause();
  var audio2 = document.getElementById("gui");
  audio2.play();
});

script.addEventListener('load', function () {
    setTimeout(function () {
        underneath_menu.style.display = "none";
        title_panorama.style.display = "none";
        document.title = "Singleplayer* — Minicraft";
    }, 1000);
});

/*exit_button.addEventListener('click', function () {
  jogo.style.display = "none";
  loader_in_panorama.style.display = "none";
  title_menu.style.opacity = "1";
  underneath_menu.style.display = "block";
  title_panorama.style.display = "block";
  document.title = "Início — Minicraft Plus";
});*/