function loadscript() {
  var script = document.createElement('script');
  var open = document.getElementById("open");
  script.src = 'game/scripts/load.js';
  document.head.appendChild(script);
  open.style.backdropFilter = "blur(0)";
}

var minicraftPlus = document.getElementById("minicraft-plus");
var userAgent = navigator.userAgent;
var unsupportedBrowser_message = "Your browser does not support this website";

if (userAgent.indexOf('Chrome') > -1) {
  console.log('O usuário está usando o Google Chrome.');
  minicraftPlus.style.display = "block";
  loadscript();

} else if (userAgent.indexOf('Firefox') > -1) {
  console.log('O usuário está usando o Mozilla Firefox.');
  minicraftPlus.style.display = "block";
  loadscript();

} else if (userAgent.indexOf('Safari') > -1) {
  console.log('O usuário está usando o Safari.');
  minicraftPlus.style.display = "none";
  ErrorMessage.innerHTML = ('<img src="bot.svg">' + '<h1>' + unsupportedBrowser_message + '</h1>' + '<p>' + "Try using Microsoft Edge instead of Safari" + '</p>');
} else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
  console.log('O usuário está usando o Internet Explorer.');
  minicraftPlus.style.display = "none";
  ErrorMessage.innerHTML = ('<img src="bot.svg">' + '<h1>' + unsupportedBrowser_message + '</h1>' + '<p>' + "Try using Microsoft Edge instead of Internet Explore" + '</p>');
} else if (userAgent.indexOf('Edge') > -1) {
  console.log('O usuário está usando o Microsoft Edge.');
  minicraftPlus.style.display = "block";
  loadscript();

} else {
  console.log('Navegador não identificado.');
  minicraftPlus.style.display = "none";
  ErrorMessage.innerHTML = ('<img src="bot.svg">' + '<h1>' + unsupportedBrowser_message + '</h1>' + '<p>' + "Try using Microsoft Edge" + '</p>');
}

if (window !== window.top) {
  minicraftPlus.style.display = "none";
  ErrorMessage.innerHTML = ('<img src="iframe.svg">' + '<h1>' + "Are you using iframe?" + '</h1>' + '<p>' + "For a better experience visit the website:" + '</p>' + '<button id="ErrorMessage_button">Open</button>');
  ErrorMessage_button.addEventListener('click', function() {
    window.open('https://minicraft-plus.klenckstudios.repl.co/','_blank');
  });
} else {
}
