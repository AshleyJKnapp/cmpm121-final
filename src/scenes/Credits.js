class Credits extends Phaser.Scene {
    constructor(){
        super("creditScene");
    }
    create(){
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        let creditConfig = {
            fontFamily: 'Ultra',
            fontSize: '25px',
            backgroundColor: '#000000',
            color: '#ffffff',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        
        
        //credits
        this.lineText1 = this.add.text(0, 0, 'Menu buttons and cursor by Kennys UI Pack for Phaser 3', creditConfig).setOrigin(0)
        this.lineText2 = this.add.text(0, this.lineText1.y +  100, 'Farm With Field by Petr Kratochvil, licensed under CC0 Public Domain', creditConfig).setOrigin(0)
        this.lineText3 = this.add.text(0, this.lineText2.y + 100, '"Chair Png Image" by Queen Brown, licensed under (CC BY-NC 4.0)', creditConfig).setOrigin(0)
        this.lineText4 = this.add.text(0, this.lineText3.y + 100, 'Column https://pngimg.com/image/15826', creditConfig).setOrigin(0)
        this.lineText5 = this.add.text(0, this.lineText4.y + 100, 'Table https://pngimg.com/image/6972', creditConfig).setOrigin(0)    
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.keyESC)){
            this.scene.start("menuScene");
        }
    }
}