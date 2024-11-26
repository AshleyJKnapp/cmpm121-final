export default class Tile extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, state = 0) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.state = state;
        this.plant = null;

        // Resources
        this.water = 0;
        this.sun = 0;

        scene.add.existing(this);
        this.setOrigin(0);
    }


    setState(newState) {
        this.state = newSstate;
        const textures = ['tile', 'obstacle', 'special'];
        this.setTexture(textures[newState]);
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

    addWater(amount) {
        this.water += amount;
    }

    removeWater(amount) {
        this.water = Math.max(0, this.water - amount);
    }

    setSun() {
        this.sun = Math.floor(Math.random() * (6));
    }
}
