class Menu extends Phaser.Scene {
    constructor(){
        super("saveSelectScene");
    }
    create(){

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