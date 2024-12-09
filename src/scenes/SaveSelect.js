class SaveSelect extends Phaser.Scene {
    constructor(){
        super("saveSelectScene");
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
            borderPadding, 'Saves', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#00FF00';
        //menuConfig.color = "#000";
        // define keys 
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        const autoSaveButton = this.add.image(gameWidth/2, gameHeight/3 + 50, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(autoSaveButton.x, autoSaveButton.y, 'Auto Save').setOrigin(0.5)
        const saveSlotOne = this.add.image(autoSaveButton.x, autoSaveButton.y + 110, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(saveSlotOne.x, saveSlotOne.y, 'Save Slot 1').setOrigin(0.5)

        const saveSlotTwo = this.add.image(saveSlotOne.x, saveSlotOne.y + 110, 'glass-panel').setDisplaySize(300, 100).setInteractive()
        this.add.text(saveSlotTwo.x, saveSlotTwo.y, 'Save Slot 2').setOrigin(0.5)


        // create input
        this.cursors = this.input.keyboard.createCursorKeys()
        //this.buttons = Phaser.GameObjects.Image
	    this.selectedButtonIndex = 0

        //this.buttons = this.add.group([autoSaveButton, saveSlotOne, saveSlotTwo])
        this.buttons = [autoSaveButton, saveSlotOne, saveSlotTwo]

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
        //for each one select a differnet local key
        if(this.selectedButtonIndex == 0){
            this.scene.start("GameScene");
        }
        if(this.selectedButtonIndex == 1){
            this.scene.start("GameScene");
        }
        if(this.selectedButtonIndex == 2){
            this.scene.start("GameScene");
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
        else if(Phaser.Input.Keyboard.JustDown(this.keyESC)){
            this.scene.start("menuScene");
        }
    }
}