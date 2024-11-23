const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
      preload: preload,
      create: create,
    },
  };
  
  function preload() {
    this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
  }
  
  function create() {
    this.add.image(400, 300, 'sky');
  }
  
  const game = new Phaser.Game(config);
  