import GameScene from "./scenes/GameScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
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

  let tutorialConfig = {
    fontFamily: 'Helvetica',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right', 
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 0
  }
  