document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

var audioElement = document.getElementById("music");
var sources = audioElement.getElementsByTagName("source");
var currentSource = 0;

audioElement.addEventListener("ended", function() {
  if (currentSource < sources.length - 1) {
    currentSource++;
  } else {
    currentSource = 0;
  }

  audioElement.src = sources[currentSource].src;

  setTimeout(function() {
    audioElement.play();
  }, 2000); 
});

function simulateLoading() {
  const progressBar = document.getElementById("progress");
  progressBar.style.animation = 'none';

  let width = 0;

  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      progressBar.style.width = width + "%";
    }
  }

  let id = setInterval(frame, 5);
}

window.onload = function() {
  simulateLoading();
};

var style1 = document.createElement('link');
var loader_text = document.getElementById('loader-text');
var loader_textUser = document.getElementById('loader-textUser');

const continueUploading = async () => {
	const user = await getUserInfo();
	if (user) {
		loader_text.textContent = "Conectado como:" ;
		loader_textUser.textContent = user.name;
		style1.href = 'game/ui/styles/title-menu.css';
		style1.rel = 'stylesheet';
		style1.type = 'text/css';
		document.head.appendChild(style1);
		setTimeout( function () {
			loader_text.textContent = "Carregando Estilos...";
			loader_textUser.textContent = "";
		}, 1000);
	} else {
		openLogin();
	};
}

window.addEventListener('load', function () {
  var script1 = document.createElement('script');
  var script2 = document.createElement('script');
	var script3 = document.createElement('script');
  var script4 = document.createElement('script');
	var loader_text = document.getElementById('loader-text');
	var loader_in = document.getElementById('loader-in');

	loader_text.textContent = "Carregando Scripts...";
	script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
	document.head.appendChild(script1);
	
  script1.addEventListener('load', function () {
		script2.src = 'game/scripts/save_world.js';
    document.head.appendChild(script2);
  });

	script2.addEventListener('load', function () {
		script3.src = 'game/scripts/user.js';
		loader_text.textContent = "Autenticando...";
		document.head.appendChild(script3);
	});

  script3.addEventListener('load', function () {
    script4.src = 'game/scripts/profile.js';
    document.head.appendChild(script4);
  });

  var style2 = document.createElement('link');
  var style3 = document.createElement('link');
	var style4 = document.createElement('link');
  var style5 = document.createElement('link');

  style1.addEventListener('load', function () {
    style2.href = 'game/ui/styles/game.css';
    style2.rel = 'stylesheet';
    style2.type = 'text/css';
    document.head.appendChild(style2);
  });
  style2.addEventListener('load', function () {
    style3.href = 'game/ui/styles/pause.css';
    style3.rel = 'stylesheet';
    style3.type = 'text/css';
    document.head.appendChild(style3);
  });
	style3.addEventListener('load', function () {
		style4.href = 'game/ui/styles/login.css';
		style4.rel = 'stylesheet';
		style4.type = 'text/css';
		document.head.appendChild(style4);
	});
  style4.addEventListener('load', function () {
    style5.href = 'game/ui/styles/profile.css';
    style5.rel = 'stylesheet';
    style5.type = 'text/css';
    document.head.appendChild(style5);
  });

  style5.addEventListener('load', function () {
    const progressBar = document.getElementById("progress");
    progressBar.style.animation = 'loading_2 1.5s infinite';
    progressBar.style.width = '100%';
		loader_text.textContent = "Carregando...";
    var audio = document.getElementById("music");
    document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === "visible") {
        audio.play();
      } else {
        audio.pause();
      }
    });
    setTimeout( function () {
			audio.volume = 0.01;
			audio.play();
      loader.style.opacity = "0";
			loader.style.filter = "blur(50px)";
      document.title = "Início — Minicraft Plus";
			loader_text.textContent = "";
      progressBar.style.display = "none";
      loader_in.style.display = "none";
      setTimeout( function () {
        loader.style.display = "none";
      }, 2500);
    }, 3000);
  });
});