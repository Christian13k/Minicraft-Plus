// Função para mapear botões de controle de Xbox
function mapXboxControllerButtons(button) {
	switch (button) {
		case 0: // A button
			handleJump(); // Faça o jogador pular
			break;
		// Adicione mais casos para outros botões conforme necessário
	}
}

// Função para mapear eixos de controle de Xbox
function mapXboxControllerAxes(axes) {
	const joystickX = axes[0];

	// Use apenas o valor de joystickX para controlar o jogador
	// Mova o jogador para a esquerda ou direita com base em joystickX
	targetPlayerX += joystickX * 0.02;

	if (joystickX > 0) {
		currentPlayerImage = PlayerImage4; // Define a imagem quando movendo para a direita
	} else if (joystickX < 0) {
		currentPlayerImage = PlayerImage2; // Define a imagem quando movendo para a esquerda
	}
}

// Verifique regularmente se há gamepads conectados e atualize os controles
function checkGamepad() {
	const gamepads = navigator.getGamepads();

	for (const gamepad of gamepads) {
		if (gamepad) {
			// Mapeie botões
			for (let i = 0; i < gamepad.buttons.length; i++) {
				if (gamepad.buttons[i].pressed) {
					mapXboxControllerButtons(i);
				}
			}

			// Mapeie eixos
			mapXboxControllerAxes(gamepad.axes);
		}
	}

	// Verifique novamente na próxima animação
	requestAnimationFrame(checkGamepad);
}

// Inicie a verificação do gamepad
requestAnimationFrame(checkGamepad);

// Adicione interatividade para mover o jogador/bloco nas direções ↑, ↓, ← e →
document.addEventListener("keydown", (event) => {
	if (event.key === "D" || event.key === "d") {
		targetPlayerX += 0.05; // Mudar para 1 para movimento mais rápido
		currentPlayerImage = PlayerImage4;
	}
});
document.addEventListener("keydown", (event) => {
	if (event.key === "A" || event.key === "a") {
		targetPlayerX -= 0.05; // Mudar para 1 para movimento mais rápido
		currentPlayerImage = PlayerImage2;
	}
});
// Add event listeners for jump controls
document.addEventListener("keydown", (event) => {
	if ((event.key === "W" || event.key === "w" || event.key === "Space") && !isJumping) {
		handleJump();
	}
});

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const jumpButton = document.getElementById("jumpButton");
jumpButton.addEventListener("click", () => {
	if (!isJumping) {
		handleJump();
	}
});

leftButton.addEventListener("click", () => {
	targetPlayerX -= 0.3;
	currentPlayerImage = PlayerImage2;
});

rightButton.addEventListener("click", () => {
	targetPlayerX += 0.3;
	currentPlayerImage = PlayerImage4;
});