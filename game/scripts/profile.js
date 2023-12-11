var user_Panel = document.getElementById("user_Panel");
var user_buttonUrl = document.getElementById("user-buttonUrl");
var user_button = document.getElementById("user-button")
var blurUser_Panel = document.getElementById("blurUser-Panel")
var userInfo = document.getElementById("userInfo")
var user_Panel_Buttons_1 = document.getElementById("user_Panel-Buttons")

var escPressionado = false;

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key === "Esc") {
    if (!escPressionado) {
      showControls();
    } else {
      startTimerToHideControls();
    }
    escPressionado = !escPressionado;
  }
});

user_buttonUrl.addEventListener("mousemove", function () {
  showControls();
});
user_buttonUrl.addEventListener("click", function () {
  showControls();
});

blurUser_Panel.addEventListener("mousemove", function () {
  startTimerToHideControls();
});

var Timeout

function showControls() {
  escPressionado = !escPressionado;
  clearTimeout(Timeout);
  Timeout = setTimeout(function () {
    user_Panel.style.opacity = "100";
    user_Panel.style.right = "0";
    user_button.style.top = "-90px";
    setTimeout(function () {
      blurUser_Panel.style.display = "block";
      setTimeout(function () {
        blurUser_Panel.style.backdropFilter = "blur(10px)";
        blurUser_Panel.style.background = "rgba(0,0,0,20%)";
      }, 50);
    }), 1000;
  }, 0);
}

function startTimerToHideControls() {
  hideControls();
}

function hideControls() {
  escPressionado = false;
  user_Panel.style.right = "-377px";
  blurUser_Panel.style.backdropFilter = "blur(0px)";
  blurUser_Panel.style.background = "rgba(0,0,0,0%)";
  setTimeout(function () {
    blurUser_Panel.style.display = "none";
  }, 300);
  setTimeout(function () {
    user_Panel.style.opacity = "0";
    user_button.style.top = "7px";
  }, 300);
}

