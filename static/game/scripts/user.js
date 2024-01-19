var play_button = document.getElementById("play-button");
var user_buttonImage = document.getElementById("user-buttonImage");
var user_Panel_userImage = document.getElementById("user_Panel-userImage");
var user_Panel_userName = document.getElementById("user_Panel-userName");
var user_Panel_userTag = document.getElementById("user_Panel-userTag");
var user_Panel_userBanner = document.getElementById("user_Panel-userBanner");
var user_buttonText = document.getElementById("user-buttonText");
var user_buttonUrl = document.getElementById("user-buttonUrl");
var user_Panel_userBio = document.getElementById("user_Panel-userBio");
//var user_buttonId = document.getElementById("user-buttonId");
var Login_Background = document.getElementById("Login_Background");
var Login = document.getElementById("Login");
var user_Panel_button_ChangeAccount = document.getElementById("user_Panel-button_ChangeAccount");


//Login_Background.style.display = "block";
//Login_Background.style.opacity = "100";

//Login.style.opacity = "100";

user_Panel_button_ChangeAccount.addEventListener('click', function () {
    window.location.href += "__authlogout";
});

const authenticate = async () => {
    const user = await getUserInfo();

    if (user) {
        var user_Panel_userBadges = document.getElementById("user_Panel-userBadges");

        console.log("Logged in as:", user.name);

        user_buttonImage.src = 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.png?size=2048';
        user_Panel_userImage.src = 'https://cdn.discordapp.com/avatars/' + user.id + '/' + user.avatar + '.png';

        user_Panel_userName.textContent = user.global_name;
        user_Panel_userTag.textContent = '@' + user.username;

        user_Panel_userBanner.style.background = user.banner_color

        user_buttonText.textContent = user.global_name;

        var script1 = document.createElement('script');
        script1.src = 'game/scripts/open_world.js';
        document.head.appendChild(script1);

        continueUploading();

    } else {
        console.log("Not logged in");
        setTimeout(function () {
            document.title = "Login — Minicraft Plus";

            openLogin();

            function openLogin() {
                window.location.href += "__auth";
            }
        }, 1500);
    }
};

authenticate();

async function getUserInfo() {
    return fetch('/__authuser')
        .then((e) => e.json())
        .then((userInfo) => {
            if (!userInfo) {
                return null;
            }

            return userInfo;
        })
        .catch(() => {
            return null;
        });
}
