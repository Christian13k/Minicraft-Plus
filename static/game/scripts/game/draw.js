// Load tree image parts
const treeLeavesImage = new Image();
treeLeavesImage.src = "game/textures/environment/tree/tree_1.png";
const treeTrunkImage = new Image();
treeTrunkImage.src = "game/textures/environment/tree/tree_2.png";
const treeShadowImage = new Image();
treeShadowImage.src = "game/textures/environment/tree/tree_3.png";

// Define block size for trees (slightly larger)
const treeBlockSize = 200;

// Maximum number of trees
const maxTrees = 5;
const trees = [];

// Define initial tree depth
const treeDepth = 0;

// Width and height of chunk (in blocks)
const chunkWidth = 5;
const chunkHeight = 5;

// Variables to keep track of the last loaded chunk
let lastChunkX = -1;
let lastChunkY = -1;

// Define o número de chunks ao redor do jogador para pré-carregar
const preloadChunks = 2;

// Função para gerar árvores em um chunk
function generateTrees(chunkX, chunkY) {
		const newTrees = [];

		for (let x = chunkX * chunkWidth; x < (chunkX + 1) * chunkWidth; x++) {
				for (let y = chunkY * chunkHeight; y < (chunkY + 1) * chunkHeight; y++) {
						// Gere árvores aleatoriamente com base em uma probabilidade
						if (Math.random() < 0.1) { // Ajuste conforme desejado
								const depth = playerY * 0.01 + treeDepth;
								const zIndex = depth + newTrees.length;
								newTrees.push({ x, y, zIndex });
						}
				}
		}

		// Atualize as árvores existentes com as novas
		for (const tree of newTrees) {
				const existingTree = trees.find(t => t.x === tree.x && t.y === tree.y);
				if (!existingTree) {
						trees.push(tree);
				}
		}

		// Ordene as árvores com base em zIndex
		trees.sort((a, b) => a.zIndex - b.zIndex);
}

// Função para atualizar as árvores com base na posição do jogador
function updateTreesBasedOnPlayerPosition() {
		const chunkX = Math.floor(playerX / chunkWidth);
		const chunkY = Math.floor(playerY / chunkHeight);

		// Gere árvores em chunks pré-carregados ao redor do jogador
		for (let x = chunkX - preloadChunks; x <= chunkX + preloadChunks; x++) {
				for (let y = chunkY - preloadChunks; y <= chunkY + preloadChunks; y++) {
						generateTrees(x, y);
				}
		}
}

// Function to draw a tree
function drawTree(x, y, zIndex) {
		ctx.save();
		ctx.globalCompositeOperation = "source-over";
		ctx.drawImage(treeLeavesImage, x * treeBlockSize, y * treeBlockSize, treeBlockSize, treeBlockSize);
		ctx.drawImage(treeTrunkImage, x * treeBlockSize, y * treeBlockSize, treeBlockSize, treeBlockSize);
		ctx.drawImage(treeShadowImage, x * treeBlockSize, y * treeBlockSize, treeBlockSize, treeBlockSize);
		ctx.restore();
}

// Define the number of visible chunks
const visibleChunksWidth = 10;
const visibleChunksHeight = 10;

// Função para atualizar o jogo e desenhar tudo
function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Calcule os limites da câmera para determinar a área visível
		const cameraLeft = cameraX - (chunkWidth * visibleChunksWidth) / 2;
		const cameraRight = cameraX + (canvas.width / PlayerSize) + (chunkWidth * visibleChunksWidth) / 2;
		const cameraTop = cameraY - (chunkHeight * visibleChunksHeight) / 2;
		const cameraBottom = cameraY + (canvas.height / PlayerSize) + (chunkHeight * visibleChunksHeight) / 2;

		// Atualize as árvores com base na posição do jogador
		updateTreesBasedOnPlayerPosition();

		// Desenhe apenas as árvores visíveis
		for (const tree of trees) {
				if (
						tree.x >= cameraLeft &&
						tree.x < cameraRight &&
						tree.y >= cameraTop &&
						tree.y < cameraBottom
				) {
						const depth = playerY * 0.01 + treeDepth;
						tree.zIndex = depth + trees.indexOf(tree);
						drawTree(tree.x - cameraX, tree.y - cameraY, tree.zIndex);
				}
		}

		// Ordene as árvores com base em zIndex
		trees.sort((a, b) => a.zIndex - b.zIndex);

		// Continue o loop de animação
		requestAnimationFrame(draw);
		updatePlayerPhysics();
		drawPlayerTrue()
}

// Aguarde o carregamento da imagem do bloco antes de iniciar o loop de animação