const controls = document.getElementById("controls");
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
  x: 50,
  y: 50,
  width: 130,
  height: 130,
  speed: 5,
  velX: 0,
  velY: 0,
  jumping: false,
  facingRight: true
};

const playerImages = {
  left: new Image(),
  right: new Image()
};

playerImages.left.src = 'game/textures/player/Clancy/2.svg'; // Substitua 'left_image_url' pelo URL da imagem olhando para a esquerda
playerImages.right.src = 'game/textures/player/Clancy/4.svg'; // Substitua 'right_image_url' pelo URL da imagem olhando para a direita

const ground = {
  x: 0,
  y: canvas.height / 2,
  width: canvas.width,
  height: 40
};

const blocks = [
  { x: 200, y: canvas.height - 80, width: 50, height: 20 },
  { x: 300, y: canvas.height - 120, width: 50, height: 20 },
  // Add more blocks as needed
];

function drawPlayer() {
  const playerImage = player.facingRight ? playerImages.right : playerImages.left;
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawGround() {
  ctx.fillStyle = 'green';
  ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
}

function drawBlocks() {
  ctx.fillStyle = 'brown';
  blocks.forEach(block => {
      ctx.fillRect(block.x, block.y, block.width, block.height);
  });
}

function update() {
  // Move player
  player.x += player.velX;
  player.y += player.velY;

  // Gravity
  if (player.y < ground.y - player.height) {
      player.velY += 0.5; // Gravity force
      player.jumping = true;
  } else {
      player.y = ground.y - player.height;
      player.velY = 0;
      player.jumping = false;
  }

  // Check collisions with blocks
  blocks.forEach(block => {
      if (
          player.x < block.x + block.width &&
          player.x + player.width > block.x &&
          player.y < block.y + block.height &&
          player.y + player.height > block.y
      ) {
          // Collision with block, stop the jump
          player.jumping = false;
          player.velY = 0;
          player.y = block.y - player.height;
      }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawGround();
  drawBlocks();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Controls
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
      player.velX = player.speed;
      player.facingRight = true;
  } else if (e.key === 'ArrowLeft') {
      player.velX = -player.speed;
      player.facingRight = false;
  } else if (e.key === 'ArrowUp' && !player.jumping) {
      player.velY = -player.speed * 2;
      player.jumping = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      player.velX = 0;
  }
});

gameLoop();