let fpsCounter = 0;
let lastFrameTime = performance.now();

function update() {
  // Calcula o tempo decorrido desde o último quadro
  const currentTime = performance.now();
  const elapsedMilliseconds = currentTime - lastFrameTime;
  lastFrameTime = currentTime;

  // Converte o tempo para segundos e calcula os FPS
  const elapsedSeconds = elapsedMilliseconds / 1000;
  const currentFPS = 1 / elapsedSeconds;

  // Atualiza o contador de FPS
  fpsCounter = currentFPS;

  // Atualiza o conteúdo na tela (por exemplo, exibindo os FPS em algum elemento HTML)
  updateDisplay();

  // Chama a próxima animação de quadro
  requestAnimationFrame(update);
}

function updateDisplay() {
  // Atualiza o conteúdo na tela, por exemplo, exibindo os FPS em algum elemento HTML
  const fpsElement = document.getElementById('fps-counter');
  if (fpsElement) {
    fpsElement.textContent = `${fpsCounter.toFixed(2)} fps`;
  }
}

// Inicia a animação de quadro
requestAnimationFrame(update);
