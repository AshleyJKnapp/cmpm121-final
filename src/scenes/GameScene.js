import Player from "../objects/Player.js";
import Tilemap from "../objects/Tilemap.js";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Preload assets
        this.tilemap = new Tilemap(this);
        this.tilemap.preload();

        // Preload other assets later
        this.load.image('player', 'src/assets/player.png');
        this.load.image('egg', 'src/assets/Roguelike RPG Pack/TilesForGame/egg.png');
        this.load.image('woodpile', 'src/assets/Roguelike RPG Pack/TilesForGame/pileofwood.png');
        this.load.image('chair', 'src/assets/Roguelike RPG Pack/TilesForGame/chair.png');
        this.load.image('table', 'src/assets/Roguelike RPG Pack/TilesForGame/table.png');
        this.load.image('wall', 'src/assets/Roguelike RPG Pack/TilesForGame/wall.png');

        //Set up an Array of plants currently on the board
        this.plantsArr = [];
    }

    create() {
        // Use Tilemap class to create map
        const { groundLayer, wallsLayer, tiles } = this.tilemap.create();

        this.groundLayer = groundLayer;
        this.wallsLayer = wallsLayer;
        this.chairsHarvested = 0;
        this.tablesHarvested = 0;
        this.wallHarvested = 0;
        this.tutorialComplete = false;
        this.gameTime = 0;
        this.nightOverlay = this.add.rectangle(0, 0, 1024, 576, 0x4c354b, 50).setOrigin(0,0);
        this.nightOverlay.setVisible(false);

        const scale = 1;

        this.player = new Player(this, 104, 104, 'player');
        this.player.setScale(scale);

        // Player Movement Controls (WASD)
        this.input.keyboard.on('keydown-A', event =>
        {
            this.player.x -= 16 * scale;
        });
        
        this.input.keyboard.on('keydown-D', event =>
        {
            this.player.x += 16 * scale;
        });

        this.input.keyboard.on('keydown-W', event =>
        {
            this.player.y -= 16 * scale;
        });

        this.input.keyboard.on('keydown-S', event =>
        {
            this.player.y += 16 * scale;
        });

        //Manuel Time Movement
        this.input.keyboard.on('keyup-RIGHT', event =>{
            this.gameTime += 12;
            if(this.gameTime / 12 == 2){
                this.gameTime = 0;        
            }
        });

        this.cameras.main.setZoom(2)
        this.cameras.main.setBounds(0, 0, 1024, 576)
        this.cameras.main.setViewport(0, 0, 1024, 576)
    }

    update(time, delta) {
        // Check player's position for camera
        // const camera = this.cameras.main;
        // const player = this.player;

        // const cameraWidth = camera.width;
        // const cameraHeight = camera.height;

        // const marginLeft = camera.scrollX + this.cameraEdgeMargin;
        // const marginRight = camera.scrollX + cameraWidth - this.cameraEdgeMargin;
        // const marginTop = camera.scrollY + this.cameraEdgeMargin;
        // const marginBottom = camera.scrollY + cameraHeight - this.cameraEdgeMargin;

        // if (player.x < marginLeft) {
        //     camera.scrollX = Math.max(0, player.x - cameraWidth / 2);
        // }

        // if (player.x > marginRight) {
        //     camera.scrollX = Math.max(1024 - cameraWidth, player.x - cameraWidth / 2);
        // }

        // if (player.y < marginTop) {
        //     camera.scrollY = Math.max(0, player.y - cameraHeight / 2);
        // }

        // if (player.y > marginBottom) {
        //     camera.scrollY = Math.max(576, player.y - cameraHeight / 2);
        // }

        this.cameraCheck();
        this.clockUpdate();
        this.plantInvCheck();
    }

        // CAMERA FUNCTION
    cameraCheck() {
        if (this.player.y <= 280 && this.player.x < 1024/2) {
            this.cameras.main.pan(1024/4, 576/4, 600, 'Power2');    
        }
        else if (this.player.y > 280 && this.player.x < 1024/2) {
            this.cameras.main.pan(1024/4, 576 * 3/4, 600, 'Power2');
        }
        else if (this.player.y > 280 && this.player.x >= 1024/2) {
            this.cameras.main.pan(1024 * 3/4, 576 * 3/4, 600, 'Power2');
        }
        else if (this.player.y <= 280 && this.player.x >= 1024/2) {
            this.cameras.main.pan(1024 * 3/4, 576/4, 600, 'Power2');
        }
            
        //console.log(this.cameras.main.x, this.player.y);
    }

    clockUpdate(){
        if(this.gameTime / 12 == 1){
            this.nightOverlay.setVisible(true);
        }
        else{
            this.nightOverlay.setVisible(false);
            this.plantUpdate();
        }
    }

    //PlaceHolder Function
    //Updates all plants on the map in the array as the day progresses
    plantUpdate(){
        for(let i = 0; i < this.plantsArr.length; i++){
            //Update every plants in array
        }
    }

    //Checks if Player has harvested 1 of each plant
    plantInvCheck(){
        if(this.chairsHarvested >= 1 && this.tablesHarvested >= 1 && this.wallHarvested >= 1 && this.tutorialComplete == false){
            //This code doesn't work because var game is unable to be read
            //this.add.text(game.config.width/2, game.config.height/3 - borderUISize - 
              //  borderPadding, 'Tutorial Complete!', tutorialConfig).setOrigin(0.5);
            console.log("Tutorial Complete!");
            this.tutorialComplete = true;
        }
    }
}