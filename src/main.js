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
}
  
  function create() {
  }
  
  const game = new Phaser.Game(config);
  