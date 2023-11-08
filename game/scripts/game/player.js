// Load Player images
let PlayerImage2 = new Image();
PlayerImage2.src = "game/textures/player/Clancy/2.svg";
let PlayerImage4 = new Image();
PlayerImage4.src = "game/textures/player/Clancy/4.svg";

const currentPlayerImage = PlayerImage2;

// Define Player size for player/Player
const PlayerSize = 150;


// Define initial position of player/Player and camera
let playerX = canvas.width / 2 - PlayerSize / 2; // Comece no centro horizontal
let playerY = canvas.height / 2 - PlayerSize / 2; // Comece no chão
let cameraX = 0;
let cameraY = canvas.height / 2; // Ajustado para o centro da tela

// Function to draw player/Player on the screen
function drawPlayer() {
	ctx.drawImage(currentPlayerImage, playerX, playerY, PlayerSize, PlayerSize);
}

// Variables for smooth player/Player movement
let targetPlayerX = playerX;
let targetPlayerY = playerY;

// Função para atualizar o jogo
function drawPlayerTrue() {
		// Atualize suavemente a posição do jogador/bloco
		const playerSpeed = 1; // Velocidade do jogador (ajuste conforme desejado)

		const xDiff = targetPlayerX - playerX;

		// Mova o jogador horizontalmente
		playerX += xDiff * playerSpeed;

		// Suavemente interpole a posição da câmera com base na posição do jogador/bloco
		const cameraSpeed = 0.1; // Velocidade da câmera (ajuste conforme desejado)
		cameraX += (playerX - cameraX) * cameraSpeed;
		cameraY += (playerY - cameraY) * cameraSpeed;

		// Desenhe o jogador/bloco centralizado no canvas
		drawPlayer(Math.floor(canvas.width / 2 / PlayerSize), Math.floor(canvas.height / 2 / PlayerSize));
}

// Constants for player physics
const gravity = 0.5; // Ajuste conforme necessário
const jumpStrength = -12; // Ajuste conforme necessário

// Player velocity
let playerVelocityX = 0;
let playerVelocityY = 0;

// Variable to keep track of jumping state
let isJumping = false;

// Function to handle player jumps
function handleJump() {
	if (!isJumping) {
		playerVelocityY = jumpStrength;
		isJumping = true;
	}
}

// Function to update player physics
function updatePlayerPhysics() {
	// Apply gravity
	playerVelocityY += gravity;

	// Update player position
	playerX += playerVelocityX;
	playerY += playerVelocityY;

	// Ground collision (modify this based on your ground level)
	if (playerY >= canvas.height / 2 - PlayerSize / 2) {
		playerY = canvas.height / 2 - PlayerSize / 2;
		playerVelocityY = 0;
		isJumping = false;
	}

	// Ensure the player stays within the canvas bounds (left and right)
	if (playerX < 0) {
		playerX = 0;
		playerVelocityX = 0;
	} else if (playerX > canvas.width - PlayerSize) {
		playerX = canvas.width - PlayerSize;
		playerVelocityX = 0;
	}
}
