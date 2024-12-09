class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.image('farm', 'src/assets/title_screen.png');
        this.load.image('glass-panel', 'src/assets/glassPanel.png')
        this.load.image('cursor-hand', 'src/assets/cursor_hand.png')
    }
    create(){
        let menuConfig = {
          fontFamily: 'Helvetica',
          fontSize: '72px',
          color: '#843605',
          align: 'right', 
          padding: {
            top: 5,
            bottom: 5,
          },
          fixedWidth: 0
        }
        let gameWidth = 1024;
        let gameHeight = 576;
        let borderUISize = gameHeight / 15;
        let borderPadding = borderUISize / 3;
  
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'farm').setOrigin(0,0);
  
        //show menu text
        this.add.text(gameWidth/2, gameHeight/3 - borderUISize - 
            borderPadding, 'Farming Furniture', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#00FF00';
        //menuConfig.color = "#000";
        // define keys
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        const playButton = this.add.image(gameWidth/2, gameHeight/3 + 50, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(playButton.x, playButton.y, 'NEW GAME').setOrigin(0.5)
        const saveSelectButton = this.add.image(playButton.x, playButton.y + 110, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(saveSelectButton.x, saveSelectButton.y, 'CONTINUE').setOrigin(0.5)

        const creditsButton = this.add.image(saveSelectButton.x, saveSelectButton.y + 110, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(creditsButton.x, creditsButton.y, 'CREDITS').setOrigin(0.5)


        // create input
        this.cursors = this.input.keyboard.createCursorKeys()
        //this.buttons = Phaser.GameObjects.Image
	    this.selectedButtonIndex = 0

        //this.buttons = this.add.group([playButton, saveSelectButton, creditsButton])
        this.buttons = [playButton, saveSelectButton, creditsButton]

        this.buttonSelector = this.add.image(0, 0, 'cursor-hand')

        this.selectButton(0, this)
    }

    selectButton(index, scene){
        const currentButton = scene.buttons[scene.selectedButtonIndex]

	    // set the current selected button to a white tint
	    currentButton.setTint(0xffffff)

	    //const button = this.buttons.get(index)
        const button = scene.buttons[index]

	    // set the newly selected button to a green tint
	    button.setTint(0x66ff7f)

	    // move the hand cursor to the right edge
	    scene.buttonSelector.x = button.x + button.displayWidth * 0.5
	    scene.buttonSelector.y = button.y + 10

	    // store the new selected index
	    scene.selectedButtonIndex = index
    }

    selectNextButton(change = 1, scene){
        let index = scene.selectedButtonIndex + change

        if(index >= 2){
            index = 2
        }
        
        else if(index <= 0){
            index = 0
        }

        this.selectButton(index, scene)
    }

    confirmSelection(){
        if(this.selectedButtonIndex == 0){
            //probably clear local storage to start a new save
            this.scene.start("GameScene");
        }
        if(this.selectedButtonIndex == 1){
            this.scene.start("saveSelectScene");
        }
        if(this.selectedButtonIndex == 2){
            this.scene.start("creditScene");
        }
    }
  
    update() {
        if(Phaser.Input.Keyboard.JustDown(this.keyUP)){
            this.selectNextButton(-1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(this.keyDOWN)) {
            this.selectNextButton(1, this)
        }
        else if (Phaser.Input.Keyboard.JustDown(this.keySPACE)){
            this.confirmSelection()
        }
    }
}