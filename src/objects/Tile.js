// import { Chair } from "./plants/Chair.js";

export default class Tile extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, layer) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.plant = null;
        this.layer = layer;

        // Resources
        this.water = 0;
        this.sun = 0;

        scene.add.existing(this);
        this.setOrigin(0);
    }

    getCellCoordinates() {
        const tileX = this.layer.worldToTileX(this.x);
        const tileY = this.layer.worldToTileY(this.y);

        return { x: tileX, y: tileY };
    }

    addPlant(plantType) {
        this.plant = plantType;
        // plant.setPosition(this.x, this.y);
    }

    removePlant() {
        if (this.plant) {
            if(this.plant.type == "chair"){
                scene.chairHarvested += 1;
            }
            else if(this.plant.type == "table"){
                scene.tableHarvested += 1;
            }
            else if(this.plant.type == "wall"){
                scene.wallHarvested += 1;
            }
            this.plant.destroy();
            this.plant = null;
        }
        else{
            console.log("There are no plants to harvest here");
        }
    }

    addWater() {
        this.water += Math.floor(Math.random() * (4));
        return this.water;
    }

    removeWater(amount) {
        this.water = Math.max(0, this.water - amount);
        return this.water;
    }

    setSun() {
        this.sun = Math.floor(Math.random() * (8));
        return this.sun;
    }

    updateTile() {
        this.addWater();
        this.setSun();
    }
}
