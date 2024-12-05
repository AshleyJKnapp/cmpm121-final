export default class Tile extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, collides) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.plant = null;
        this.collides = collides;

        // Resources
        this.water = 0;
        this.sun = 0;

        scene.add.existing(this);
        this.setOrigin(0);
    }

    // Holds a pointer to a plant obj, which contains the
    // current growthstage and provides the correct textures
    addPlant(plant) {
        if (plant == null){
             console.warn("addPlant(): trying to add an undefined plant.");
        }
        this.plant = plant;
        // plant.setPosition(this.x, this.y);
    }

    removePlant() {
        if (this.plant) {
            //if(this.plant.type == "chair"){
            //    this.chairHarvested += 1;
            //}
            //else if(this.plant.type == "table"){
            //    this.tableHarvested += 1;
            //}
            //else if(this.plant.type == "wall"){
            //    this.wallHarvested += 1;
            //}
            this.plant = null;
            this.setTexture("__DEFAULT");
        }
        else{
            console.log("There are no plants to harvest here");
        }
    }

    addWater() {
        if (this.water > 25){
            return this.water;
        }
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
