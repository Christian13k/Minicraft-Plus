const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

// Define a posição inicial do jogador
let playerX = canvas.width / 2;
let playerY = canvas.height - 30;

// Define a velocidade do jogador
let playerSpeed = 5;

// Variáveis para controlar o movimento
let rightPressed = false;
let leftPressed = false;

// Adiciona listeners para os eventos de tecla
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Função para tratar o evento de pressionar uma tecla
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

// Função para tratar o evento de soltar uma tecla
function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Função para desenhar o jogador
function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, playerY, 50, 50);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Função para atualizar a posição do jogador
function updatePlayer() {
    if (rightPressed && playerX < canvas.width - 50) {
        playerX += playerSpeed;
    } else if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }
}

// Função principal de desenho e atualização
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Atualiza e desenha o jogador
    updatePlayer();
    drawPlayer();

    // Continua o loop de animação
    requestAnimationFrame(draw);
}

// Inicia o loop de animação
draw();