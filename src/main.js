import GameScene from "./scenes/GameScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1920,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [GameScene]
  };
  
  function preload() {
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
  }
  
  function create() {
    this.add.image(400, 300, 'sky');
  }
  
  const game = new Phaser.Game(config);
  