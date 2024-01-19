const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('ground', 'assets/ground.png');
  this.load.spritesheet('player', 'assets/player.png', {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create() {
  this.ground = this.physics.add.staticGroup();
  for (let i = 0; i < 25; i++) {
    this.ground.create(i * 32, 550, 'ground').setScale(2).refreshBody();
  }

  this.player = this.physics.add.sprite(100, 450, 'player');
  this.player.setBounce(0.2);
  this.physics.add.collider(this.player, this.ground);
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    this.player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    this.player.setVelocityX(160);
  } else {
    this.player.setVelocityX(0);
  }

  if (cursors.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-330);
  }
}
