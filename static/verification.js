var error = document.getElementById("Error");

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/static/service-worker.js')
    .then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(error => {
      console.error('Falha ao registrar o Service Worker:', error);
    });
}

var otherTexts = ('<div>' + '<span id="loader-textGame_version">v1.46.31.0 Preview</span>' + '<span id="loader-textReplit">Made in Replit — Create by Klenck Studios</span>' + '</div>');

function openMini() {
  var scriptLoad = document.createElement('script');
  var open = document.getElementById("open");
  scriptLoad.src = '/static/game/scripts/load.js';
  document.head.appendChild(scriptLoad);
}

window.addEventListener('load', function () {
  ErrorMessage.style.opacity = "100";
});

var minicraftPlus = document.getElementById("minicraft-plus");
var userAgent = navigator.userAgent;
var unsupportedBrowser_message = "Your browser does not support this website";

if (window !== window.top) {
  ErrorMessage.innerHTML = ('<img src="iframe.svg">' + '<h1>' + "Are you using iframe?" + '</h1>' + '<p>' + "For a better experience visit the website:" + '</p>' + '<button id="ErrorMessage_button">Open</button>');
  error.style.display = "block";

  ErrorMessage_button.addEventListener('click', function() {
    window.open('https://minicraft-plus.klenckstudios.repl.co/', '_blank');
  });
} else {
  error.style.display = "none";

  if (userAgent.indexOf('Chrome') > -1) {
    console.log('O usuário está usando o Google Chrome.');
    minicraftPlus.style.display = "block";
    openMini();
    error.style.display = "none";

  } else if (userAgent.indexOf('Firefox') > -1) {
    console.log('O usuário está usando o Mozilla Firefox.');
    minicraftPlus.style.display = "block";
    openMini();
    error.style.display = "none";

  } else if (userAgent.indexOf('Safari') > -1) {
    console.log('O usuário está usando o Safari.');
    ErrorMessage.innerHTML = ('<h1>' + unsupportedBrowser_message + '</h1>' + '<p>' + "Try using Microsoft Edge instead of Safari" + '</p>' + otherTexts);
     error.style.display = "block";
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
    console.log('O usuário está usando o Internet Explorer.');
    ErrorMessage.innerHTML = ('<h1>' + unsupportedBrowser_message + '</h1>' + '<p>' + "Try using Microsoft Edge instead of Internet Explore" + '</p>' + otherTexts);
     error.style.display = "block";
  } else if (userAgent.indexOf('Edge') > -1) {
    console.log('O usuário está usando o Microsoft Edge.');
    minicraftPlus.style.display = "block";
    openMini();
    error.style.display = "none";

  } else {
    console.log('Navegador não identificado.');
    ErrorMessage.innerHTML = ('<h1>' + unsupportedBrowser_message + '</h1>' + '<p>' + "Try using Microsoft Edge" + '</p>' + otherTexts);
     error.style.display = "block";
  }
}