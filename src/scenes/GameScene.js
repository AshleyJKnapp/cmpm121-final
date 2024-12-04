import Player from "../objects/Player.js";
import ByteStructure, { Tilemap } from "../objects/ByteStructure.js";
//import parsedData from '../scenarioData.json';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.KEY = "LOCAL";
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
        const { _map, groundLayer, wallsLayer, tiles } = this.tilemap.create();
        // console.log(this.tilemap.getTiles());
        
        this.groundLayer = groundLayer;
        this.wallsLayer = wallsLayer;
        this.tilesLayer = tiles;
        this.tileSize = 16;
        this.currentItem = "";
        this.roomsComplete = 0;
        // remove these harvested and related logic later, as we are not harvesting these
        this.chairsHarvested = 0;
        this.tablesHarvested = 0;
        this.wallHarvested = 0;
        this.tutorialComplete = false;
        this.gameTime = 0;
        this.halfDay = 12;
        this.isDaytime = true;
        this.nightOverlay = this.add.rectangle(0, 0, 1024, 576, 0x4c354b, 50).setOrigin(0,0);
        this.nightOverlay.setVisible(false);

        // Scenario-based Variables
        this.enabledPlants = [ "chair", "table", "wall" ]; // Array for currently available plants
        this.winConditions = []
        

        const scale = 1;

        this.player = new Player(this, 104, 104, 'player');
        this.player.setScale(scale);

        // -- Player Movement Controls (WASD) --
        // Left
        this.input.keyboard.on('keydown-A', event =>
        {   
            const newx= this.player.x - this.tileSize * scale;
            // Tiled hates floats, use floor
            const tileX = Math.floor(newx / this.tileSize);
            const tileY = Math.floor(this.player.y / this.tileSize);
            if(!this.wallCollision(tileX,tileY)){
                this.player.x = newx;
            }
            this.saveGameState();
            this.gameTimeUpdate();
        });
        
        // Right
        this.input.keyboard.on('keydown-D', event =>
        {
            this.player.x += this.tileSize * scale;
            this.saveGameState();
            this.gameTimeUpdate();
        });

        // Up
        this.input.keyboard.on('keydown-W', event =>
        {
            this.player.y -= this.tileSize * scale;
            this.saveGameState();
            this.gameTimeUpdate();
        });

        // Down
        this.input.keyboard.on('keydown-S', event =>
        {
            this.player.y += this.tileSize * scale;
            this.saveGameState();
            this.gameTimeUpdate();
        });
        //---debug--localstate------------------
        /*
        this.input.keyboard.on('keydown-Z', event =>
            {
                localStorage.clear();
            });

        */
        //  -- Player Select Item In Inventory --
        // TODO: somehow indicate to the player what they are holding
        // Chair
        this.input.keyboard.on('keydown-ONE', event =>
        {
            if (this.enabledPlants[0])
            {
                console.log("Holding chair");
                this.currentItem = this.enabledPlants[0];
            }
        });
        // Table
        this.input.keyboard.on('keydown-TWO', event =>
        {
            if (this.enabledPlants[1])
            {
                console.log("Holding table");
                this.currentItem = this.enabledPlants[1];
            }
        });
        // Wall
        this.input.keyboard.on('keydown-THREE', event =>
        {
            if (this.enabledPlants[2])
            {
                console.log("Holding wall");
                this.currentItem = this.enabledPlants[2];
            }
        });

        // -- Player Actions --
        this.input.keyboard.on('keydown-ENTER', event =>
        {
            
            // Create a plant to put in Tile
            let plant = null;
            if(this.currentItem == "chair"){
                plant = new Chair();
            }
            else if(this.currentItem == "table"){
                plant = new Table();
            }
            else if(this.currentItem == "wall"){
                plant = new Wall();
            }

            // Get the tile that has the coords right in front of the player
            let t;
            for (let i = 0; i < this.tilesLayer.length; i++){
                // -offset & +offset to fix offset from character placement
                let offset = this.tileSize/2;
                if (this.tilesLayer[i].x == this.player.x-offset && this.tilesLayer[i].y == this.player.y+offset){
                    t = this.tilesLayer[i];
                }
            }

            // If a tile was found, put the plant in it
            if (t != null && plant != null){
                // Store the plant in the tile
                t.addPlant(plant);
                t.setTexture(plant.updateSprite());
                // Store the tile in an array
                this.plantsArr.push(t);
            }
        });


        this.cameras.main.setZoom(2)
        this.cameras.main.setBounds(0, 0, 1024, 576)
        this.cameras.main.setViewport(0, 0, 1024, 576)

        this.loadGameState();
    }

    update(time, delta) {
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
            
    }

    gameTimeUpdate(){
        this.gameTime += 1;
        if (this.isDaytime){
            this.plantUpdate();
        }
        if(this.gameTime / this.halfDay == 2){
            this.gameTime = 0;        
        }
    }

    clockUpdate(){
        if(this.gameTime / this.halfDay > 1){
            this.nightOverlay.setVisible(true);
            this.isDaytime = false;
        }
        else{
            this.nightOverlay.setVisible(false);
            this.isDaytime = true;
        }
    }

    // Updates all tiles and plants on the map in the array as the day progresses
    plantUpdate(){
        let numChairs = 0;
        let numTables = 0;
        let numWalls = 0;

        for(let i = 0; i < this.tilesLayer.length; i++){
            let currTile = this.tilesLayer[i];
            let currPlant = currTile.plant;

            // Generate randomized sun and water for every tile
            let sun = currTile.setSun();
            let water = currTile.addWater();

            // Run plant growth logic if there is a plant on this tile
            if (currPlant != null){
                if (currPlant.type == "chair"){
                    let grew = currPlant.plantCheck(sun, water);
                    if (grew) { currTile.removeWater(currPlant.requiredWater); }
                    currTile.setTexture(currPlant.updateSprite());
                    if (currPlant.fullyGrown) { numChairs++; }
                }
    
                else if (currPlant.type == "table"){
                    let checkArr = this.tableReqCollect(currTile.x, currTile.y);
                    let grew = currPlant.plantCheck(sun, water, checkArr);
                    if (grew) { currTile.removeWater(currPlant.requiredWater); }
                    currTile.setTexture(currPlant.updateSprite());
                    if (currPlant.fullyGrown) { numTables++; }
                }
    
    
                // TODO: make the walls connect to each other
                else if (currPlant.type == "wall"){
                    let checkArr = this.wallReqCollect(currTile.x, currTile.y);
                    let grew = currPlant.plantCheck(sun, water, checkArr);
                    if (grew) { currTile.removeWater(currPlant.requiredWater); }
                    currTile.setTexture(currPlant.updateSprite());
                    if (currPlant.fullyGrown) { numWalls++; }
                }

            }
        }

        // TODO: make a function to check if all of these are near each other
        if (numChairs >= 2 && numTables >= 1 && numWalls >= 4) {
            this.roomsComplete++;
        }
    }

    // Collects all grown plants surrounding x, y
    tableReqCollect(x, y){
        let arr = [];

        // Check all tiles around x, y for the type of chair
        for (let dx = -this.tileSize; dx <= this.tileSize; dx += this.tileSize) {
            for (let dy = -this.tileSize; dy <= this.tileSize; dy += this.tileSize) {
                // Skip this tile
                if (dx === 0 && dy === 0) continue;

                // Check all plants for one with requirements
                for(let i = 0; i < this.plantsArr.length; i++){
                    let checkedTile = this.plantsArr[i];
                
                    // if fully grown AND x, y == x, y of tile we are checking
                    if (checkedTile.plant.fullyGrown && (x + dx == checkedTile.x && y + dy == checkedTile.y)){
                        arr.push(checkedTile.plant);
                    }

                }
            }
        }

        return arr;
    }

    // Collects all grown plants in the column and row of x, y
    wallReqCollect(x, y){
        let arr = [];

        // Check all plants
        // for (const tile of tiles) {
        for(let i = 0; i < this.plantsArr.length; i++){
            let checkedTile = this.plantsArr[i];
            // Check if the tile is on the same row or column
            if (checkedTile.x == x || checkedTile.y == y) {
                arr.push(checkedTile.plant);
            }
        }

        return arr;
    }


    // PLACEHOLDER CODE:
    // right now it creates an array of the closest tiles that are
    // above, below, left, and right of x, y
    // we will want it to place wall tiles down in between x, y and walls near it
    // unless there is something int he way
    wallDrawBetween(x, y){
        let arr = [];
        let cUp;
        let cDown;
        let cLeft;
        let cRight;

        // Check all plants for the closest tile in rows and colums
        for(let i = 0; i < this.plantsArr.length; i++){
            let checkedTile = this.plantsArr[i];

            // Check only fully grown plants
            if (checkedTile.plant.fullyGrown) {
                // Check if the tile is above
                if (checkedTile.x === x && checkedTile.y < y) {
                    if (!cUp || y - checkedTile.y < y - cUp.y) {
                        cUp = checkedTile.plant;
                    }
                }
                // Check if the tile is below
                if (checkedTile.x === x && checkedTile.y > y) {
                    if (!cDown || checkedTile.y - y < cDown.y - y) {
                        cDown = checkedTile.plant;
                    }
                }
                // Check if the tile is to the left
                if (checkedTile.y === y && checkedTile.x < x) {
                    if (!cLeft || x - checkedTile.x < x - cLeft.x) {
                        cLeft = checkedTile.plant;
                    }
                }
                // Check if the tile is to the right
                if (checkedTile.y === y && checkedTile.x > x) {
                    if (!cRight || checkedTile.x - x < cRight.x - x) {
                        cRight = checkedTile.plant;
                    }
                }
            }
        }

        if (cRight) { arr.push (cRight); }
        if (cRight) { arr.push (cRight); }
        if (cRight) { arr.push (cRight); }
        if (cRight) { arr.push (cRight); }
        
        return arr;
    }

    //Checks if Player has harvested 1 of each plant
    plantInvCheck(){
        // if(this.chairsHarvested >= 1 && this.tablesHarvested >= 1 && this.wallHarvested >= 1 && this.tutorialComplete == false){
        if(this.roomsComplete >= 1) {
            //This code doesn't work because var game is unable to be read
            //this.add.text(game.config.width/2, game.config.height/3 - borderUISize - 
              //  borderPadding, 'Tutorial Complete!', tutorialConfig).setOrigin(0.5);
            console.log("Tutorial Complete!");
            this.tutorialComplete = true;
        }
    }
    wallCollision(tileX, tileY){
        const tile = this.wallsLayer.getTileAt(tileX, tileY);
        // If the tile exists and it has a 'collides' property, block the movement
        if (!tile || !tile.properties.collides) {
            return false;
        }
        return true;
    }

    //Save Game State
    saveGameState(){
        var gameState = {
            playerLocation: {x: this.player.x, y: this.player.y},
            plantsArr: this.plantsArr,
            gameTime: this.gameTime,
        };
        localStorage.setItem(this.KEY, JSON.stringify(gameState));
    }

    //Loads save state on reload
    loadGameState() {
        var gameState = localStorage.getItem(this.KEY);
        if (gameState) {
          const state = JSON.parse(gameState);
          if (!state) {
            return;
          }
          let currentLocation = state.playerLocation;
          this.player.x = currentLocation.x;
          this.player.y = currentLocation.y;
          this.gameTime = state.gameTime;
          this.gameTimeUpdate();
      
          if (!currentLocation) {
            alert("Something went wrong with your location.");
            currentLocation = origin;
          }
        } else {
          this.player.x = this.player.y = 0;
        }
      }

    // Loads scenario mode based on .yml file
    loadScenarioMode() {
        switch (parsedData.chosen_scenario[0])
        {
            case "sandbox":
                this.runScenarioMode(parsedData.sandbox);
                break;
            case "story":
                this.runScenarioMode(parsedData.story);
                break;
        }
    }

    // Starts current scenario mode
    runScenarioMode(scenario) {
        if (scenario.tutorial)
        {
            this.enabledPlants = scenario.tutorial.available_plants;
            this.winConditions = scenario.tutorial.win_conditions;
        }
    }

    checkWin(winConditions) {
        let winArray = [];

        for (let w = 0; w < winConditions.length; w++)
        {
            winArray.push(false);
        }

        for (let i = 0; i < winConditions; i++)
        {
            if (winConditions[i][1] == "min")
            {
                let typeCheck = winConditions[i][0];
                let typeCount = 0;

                for (let m = 0; m < this.plantsArr; m++)
                {
                    if (this.plantsArr[m].type == typeCheck)
                    {
                        typeCount++;
                    }
                }

                if (typeCheck >= winConditions[i][2])
                {
                    winArray[i] = true;
                }
            }
            else if (winConditions[i][1] == "max")
            {
                let typeCheck = winConditions[i][0];
                let typeCount = 0;

                for (let m = 0; m < this.plantsArr; m++)
                {
                    if (this.plantsArr[m].type == typeCheck)
                    {
                        typeCount++;
                    }
                }

                if (typeCheck <= winConditions[i][2])
                {
                    winArray[i] = true;
                }
            }
        }

        if (!winArray.some(f => f == false))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}