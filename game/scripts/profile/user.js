var play_button = document.getElementById("play-button");
var user_buttonImage = document.getElementById("user-buttonImage");
var user_buttonText = document.getElementById("user-buttonText");
var user_buttonUrl = document.getElementById("user-buttonUrl");
var user_buttonId = document.getElementById("user-buttonId");
var replitLogin_Background = document.getElementById("replitLogin_Background");
var replitLogin = document.getElementById("replitLogin");

const authenticate = async () => {
		const user = await getUserInfo();

	if (user) {
		console.log("Logged in as:", user.name);
		
		user_buttonImage.src = user.profileImage;
		user_buttonText.textContent = user.name;
		user_buttonId.textContent = user.id;
		user_buttonUrl.href = user.url;
		play_button.style.filter = "saturate(100%)";
		replitLogin_Background.style.display = "none";

		document.title = "Início — Minicraft Plus";
		var favicon = document.querySelector("link[rel*='icon']");
			favicon.href = "game/textures/ui/ico.png"

		var script1 = document.createElement('script');
		script1.src = 'game/scripts/open_world.js';
		document.head.appendChild(script1);
		
	} else {
		console.log("Not logged in");

		user_buttonText.textContent = "Faça login";
		user_buttonId.textContent = "Para continuar a jogar!";
		user_buttonUrl.onclick = "openLogin()";
		play_button.style.filter = "saturate(0%)";
		
		replitLogin_Background.style.display = "block";
		setTimeout( function () {
			replitLogin_Background.style.opacity = "100";
			replitLogin.style.opacity = "100";
			replitLogin.style.transform = "translate(-50%, 50%)";
			replitLogin.style.bottom = "50%";
		}, 500);
		
		var favicon = document.querySelector("link[rel*='icon']");
			favicon.href = "game/ui/styles/textures/Replit.svg"
		setTimeout( function () {
			document.title = "Login — Minicraft Plus";

			openLogin()

			function openLogin() {
				window.addEventListener('message', authComplete);
				var h = 500;
				var w = 350;
				var left = screen.width / 2 - w / 2;
				var top = screen.height / 2 - h / 2;

				var authWindow = window.open(
					'https://repl.it/auth_with_repl_site?domain=' + location.host,
					'_blank',
					'modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
						w +
						', height=' +
						h +
						', top=' +
						top +
						', left=' +
						left,
				);

				function authComplete(e) {
					if (e.data !== 'auth_complete') {
						return;
					}

					window.removeEventListener('message', authComplete);

					authWindow.close();
					authenticate();
				}
			}

			
		}, 1500);
	}
};

authenticate();