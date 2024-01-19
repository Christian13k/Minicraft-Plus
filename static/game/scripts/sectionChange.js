var topPanel_a1 = document.getElementById("topPanel_a1");
var topPanel_a2 = document.getElementById("topPanel_a2");
var topPanel_a3 = document.getElementById("topPanel_a3");
var topPanel_a4 = document.getElementById("topPanel_a4");
var topPanel_a5 = document.getElementById("topPanel_a5");
var topPanel_a6 = document.getElementById("topPanel_a6");

var AmigosPanel = document.getElementById("AmigosPanel");
var HometitlePanel = document.getElementById("title-panorama");

topPanel_a1.addEventListener('click', function () {
    AmigosPanel.style.left = "0%";
    HometitlePanel.style.left = "100%";
    document.title = "Friends — Minicraft";
});
topPanel_a2.addEventListener('click', function () {
    HometitlePanel.style.left = "0%";
    AmigosPanel.style.left = "-100%";
    document.title = "Home — Minicraft";
});