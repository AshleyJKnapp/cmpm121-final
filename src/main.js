import GameScene from "./scenes/GameScene.js";

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    scale: {
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
    scene: [Menu, Credits, GameScene, SaveSelect]
  };
  
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

//let gameplayScene = this.scene.get('GameScene');
let keyLEFT, keyRIGHT;

document.getElementById("reset")?.addEventListener("click", () => {
  const promptConfirmation = prompt("Are you sure you want to delete your saves? Yes | No");
  if (promptConfirmation?.toLocaleLowerCase() === "yes") {
    alert("Deleted Save Data");
    localStorage.clear();
    //resetMap(104);
  }
});

document.getElementById("save")?.addEventListener("click", () => {
  //gameplayScene.saveGameState();
  alert("Saved Game");
});

document.getElementById('info').innerHTML = '<strong>Controls:</strong> WASD: move | ESC: Pause Game | SPACE: Action Key'
document.getElementById('info').style.color = "#000000"
document.getElementById('info').style.textAlign = 'center'
  