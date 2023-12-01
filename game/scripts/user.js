var play_button = document.getElementById("play-button");
var user_buttonImage = document.getElementById("user-buttonImage");
var user_Panel_userImage = document.getElementById("user_Panel-userImage");
var user_Panel_userName = document.getElementById("user_Panel-userName");
var user_Panel_userTag = document.getElementById("user_Panel-userTag");
var user_buttonText = document.getElementById("user-buttonText");
var user_buttonUrl = document.getElementById("user-buttonUrl");
var user_Panel_userBio = document.getElementById("user_Panel-userBio");
//var user_buttonId = document.getElementById("user-buttonId");
var replitLogin_Background = document.getElementById("replitLogin_Background");
var replitLogin = document.getElementById("replitLogin");
var user_Panel_button_ChangeAccount = document.getElementById("user_Panel-button_ChangeAccount");

user_Panel_button_ChangeAccount.addEventListener('click', function() {
	function openLogin() {
		window.addEventListener('message', authComplete);
		var authWindow = window.open(
			'https://replit.com/auth_with_repl_site?domain=' + location.host,
			'_blank'
		);
		function authComplete(e) {
			if (e.data !== 'auth_complete') {
				return;
			}
			window.removeEventListener('message', authComplete);
			authWindow.close();
			location.reload();
		}
	}	
	openLogin();
});

const authenticate = async () => {
	const user = await getUserInfo();

	if (user) {
		const minhaString = user.url.toString();
		const miniID = minhaString.substring(20);
		const ID = ('@' + miniID);
		
		console.log("Logged in as:", user.name);
		
		user_buttonImage.src = user.profileImage;
		user_Panel_userImage.src = user.profileImage;
		user_Panel_userName.textContent = user.name;
		user_Panel_userTag.textContent = ID;
		user_Panel_userBio.textContent = user.bio;


		user_buttonText.textContent = user.name;
		//user_buttonId.textContent = ID;
		play_button.style.filter = "saturate(100%)";
		replitLogin_Background.style.display = "none";

		var favicon = document.querySelector("link[rel*='icon']");
			favicon.href = "game/textures/ui/ico.png"

		var script1 = document.createElement('script');
		script1.src = 'game/scripts/open_world.js';
		document.head.appendChild(script1);

		continueUploading();
		
	} else {
		console.log("Not logged in");

		play_button.style.filter = "saturate(0%)";
		
		replitLogin_Background.style.display = "block";
		setTimeout( function () {
			replitLogin_Background.style.opacity = "100";
			replitLogin.style.opacity = "100";
			replitLogin.style.transform = "translate(-50%, 50%)";
			replitLogin.style.bottom = "50%";
		}, 500);
		
		var favicon = document.querySelector("link[rel*='icon']");
			favicon.href = "game/ui/styles/textures/Replit.svg";
		setTimeout( function () {
			document.title = "Login — Minicraft Plus";

			openLogin();

			function openLogin() {
				window.addEventListener('message', authComplete);
				var h = 500;
				var w = 350;
				var left = screen.width / 2 - w / 2;
				var top = screen.height / 2 - h / 2;

				var authWindow = window.open(
					'https://replit.com/auth_with_repl_site?domain=' + location.host,
					'_blank'
				);

				function authComplete(e) {
					if (e.data !== 'auth_complete') {
						return;
					}

					window.removeEventListener('message', authComplete);

					authWindow.close();
					location.reload();
				}
			}			
		}, 1500);
	}
};
	
authenticate();
