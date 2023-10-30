function saveGame() {
  // Dados do jogo que você deseja salvar (por exemplo, pontuação, posição do jogador, etc.)
  const gameData = {
    score: 1000,
    playerX: playerX,
    playerY: playerY,
  };
  
  // Converter os dados em JSON
  const jsonData = JSON.stringify(gameData);
  
  // Armazenar os dados no cookie com uma data de expiração
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // Expira em 7 dias
  document.cookie = `gameData=${jsonData}; expires=${expirationDate.toUTCString()}`;
}

function loadGame() {
  const cookieData = document.cookie
    .split("; ")
    .find((row) => row.startsWith("gameData="));
  
  if (cookieData) {
    const jsonData = cookieData.split("=")[1];
    const gameData = JSON.parse(jsonData);
    
    // Recuperar os dados do jogo (por exemplo, a posição do jogador)
    const savedPlayerX = gameData.playerX;
    const savedPlayerY = gameData.playerY;
    
    // Use os dados carregados para restaurar o estado do jogo
    // Por exemplo: playerX = savedPlayerX, playerY = savedPlayerY
  }
}
