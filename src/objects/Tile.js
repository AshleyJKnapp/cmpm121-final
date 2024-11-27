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

    addPlant(plant) {
        this.plant = plant;
        plant.setPosition(this.x, this.y);
    }

    removePlant() {
        if (this.plant) {
            this.plant.destroy();
            this.plant = null;
        }
    }

    addWater() {
        this.water += Math.floor(Math.random() * (4));
    }

    removeWater(amount) {
        this.water = Math.max(0, this.water - amount);
    }

    setSun() {
        this.sun = Math.floor(Math.random() * (8));
    }

    updateTile() {
        this.addWater();
        this.setSun();
    }
}
