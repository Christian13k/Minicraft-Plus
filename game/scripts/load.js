document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

var audioElement = document.getElementById("music");
var sources = audioElement.getElementsByTagName("source");
var currentSource = 0;

function transition() {
  let volume = 0;

  function frame() {
    if (volume >= 0.5) {
      clearInterval(id);
    } else {
      volume += 0.01;
      audioElement.play();
      audioElement.volume = volume;
    }
  }

  let id = setInterval(frame, 100);
}

audioElement.addEventListener("ended", function() {
  if (currentSource < sources.length - 1) {
    currentSource++;
    audioElement.volume = 0;
    setTimeout(function() {
      audioElement.src = sources[currentSource].src;
      transition();
    }, 500); // Tempo de espera igual à duração da transição
  } else {
    audioElement.play();
  }
});

audioElement.src = sources[currentSource].src;

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

window.addEventListener('offline', function() {
  var offlineStamp = document.getElementById('offlineStamp');
  var offlineStamp_Text = document.getElementById('offlineStamp-text');
  var trying_toReconnect = document.getElementById('trying-toReconnect');

  offlineStamp_Text.textContent = "You are offline!";
  offlineStamp.style.transform = 'translateY(0)';
  trying_toReconnect.src = 'loader.svg';
});
window.addEventListener('online', function() {
  var offlineStamp = document.getElementById('offlineStamp');
  var offlineStamp_Text = document.getElementById('offlineStamp-text');
  var trying_toReconnect = document.getElementById('trying-toReconnect');

  offlineStamp.style.transform = 'translateY(100px)';
  offlineStamp_Text.textContent = "Connected!";
  trying_toReconnect.src = '';
});

var style1 = document.createElement('link');
var loader_text = document.getElementById('loader-text');
var loader_textFinished = document.getElementById('loader_textFinished');
var loader_imageUser = document.getElementById('loader-imageUser');
var loader_textUser = document.getElementById('loader-textUser');

const continueUploading = async () => {
  const user = await getUserInfo();
  if (user) {
    loader_text.textContent = "Loading Styles";
    loader_imageUser.style.display = 'block';
    loader_imageUser.src = user.profileImage;
    loader_textUser.textContent = ('Hi, ' + user.name + '!');
    style1.href = 'game/ui/styles/title-menu.css';
    style1.rel = 'stylesheet';
    style1.type = 'text/css';
    document.head.appendChild(style1);
  } else {
    openLogin();
  };
}

window.addEventListener('load', function() {
  var script1 = document.createElement('script');
  var script2 = document.createElement('script');
  var script3 = document.createElement('script');
  var script4 = document.createElement('script');
  var script5 = document.createElement('script');
  var loader_text = document.getElementById('loader-text');
  var loader_in = document.getElementById('loader-in');

  loader_text.textContent = "Loading Scripts";
  script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  document.head.appendChild(script1);
  loader_textFinished.textContent = "0 of 10";

  script1.addEventListener('load', function() {
    script2.src = 'game/scripts/save_world.js';
    document.head.appendChild(script2);
    loader_textFinished.textContent = "1 of 10";
  });

  script2.addEventListener('load', function() {
    script5.src = 'https://cdn.jsdelivr.net/npm/colorthief@2.3.2/dist/color-thief.min.js';
    document.head.appendChild(script5);
    loader_textFinished.textContent = "2 of 10";
  });

  script5.addEventListener('load', function() {
    script3.src = 'game/scripts/user.js';
    loader_text.textContent = "Authenticating";
    document.head.appendChild(script3);
    loader_textFinished.textContent = "3 of 10";
  });

  script3.addEventListener('load', function() {
    script4.src = 'game/scripts/profile.js';
    document.head.appendChild(script4);
    loader_textFinished.textContent = "4 of 10";
  });

  var style2 = document.createElement('link');
  var style3 = document.createElement('link');
  var style4 = document.createElement('link');
  var style5 = document.createElement('link');
  var style6 = document.createElement('link');

  style1.addEventListener('load', function() {
    style2.href = 'game/ui/styles/game.css';
    style2.rel = 'stylesheet';
    style2.type = 'text/css';
    document.head.appendChild(style2);
    loader_textFinished.textContent = "5 of 10";
  });
  style2.addEventListener('load', function() {
    style3.href = 'game/ui/styles/pause.css';
    style3.rel = 'stylesheet';
    style3.type = 'text/css';
    document.head.appendChild(style3);
    loader_textFinished.textContent = "6 of 10";
  });
  style3.addEventListener('load', function() {
    style4.href = 'game/ui/styles/login.css';
    style4.rel = 'stylesheet';
    style4.type = 'text/css';
    document.head.appendChild(style4);
    loader_textFinished.textContent = "7 of 10";
  });
  style4.addEventListener('load', function() {
    style5.href = 'game/ui/styles/profile.css';
    style5.rel = 'stylesheet';
    style5.type = 'text/css';
    document.head.appendChild(style5);
    loader_textFinished.textContent = "8 of 10";
  });
  style5.addEventListener('load', function() {
    style6.href = 'game/ui/styles/offline.css';
    style6.rel = 'stylesheet';
    style6.type = 'text/css';
    document.head.appendChild(style6);
    loader_textFinished.textContent = "9 of 10";
  });

  style6.addEventListener('load', function() {
    loader_textFinished.textContent = "Download finished!";
    const progressBar = document.getElementById("progress");
    progressBar.style.animation = 'loading_2 1.5s infinite';
    progressBar.style.width = '100%';
    loader_text.textContent = "Loading";
    var audio = document.getElementById("music");
    audio.volume = 0;
    setTimeout(function() {
      audio.volume = 0.5;
      loader.style.opacity = "0";
      loader.style.filter = "blur(50px)";
      document.title = "Home — Minicraft";
      loader_text.textContent = "Wait";
      loader_in.style.display = "none";
      setTimeout(function() {
        loader.style.display = "none";
        audio.play();
      }, 2500);
    }, 3000);
  });
});

