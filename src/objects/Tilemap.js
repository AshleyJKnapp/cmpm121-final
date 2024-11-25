export default class Tilemap {
    constructor(scene) {
        // Load map
        this.scene = scene;
    }

    preload() {
        this.scene.load.tilemapTiledJSON('map', 'src/assets/tiles/tiles_prototype.tmj');
        this.scene.load.image('tiles', 'src/assets/tiles/tilemap.png');
    }

    create() {
        // Create tilemap from JSON
        const map = this.scene.make.tilemap({ key: 'map' });

        // Add tileset image
        const tileset = map.addTilesetImage('Furniture Farming', 'tiles', 16, 16, 0, 1);

        // Create layers
        const groundLayer = map.createLayer('Ground', tileset, 0, 0);
        const wallsLayer = map.createLayer('Walls', tileset, 0, 0);

        groundLayer.setScale(3);
        wallsLayer.setScale(3);

        // Collision for Walls Layer
        wallsLayer.setCollisionByProperty({ collides: true });

        // Return the layers to use in GameScene
        return { map, groundLayer: this.groundLayer, wallsLayer: this.wallsLayer };
    }

    getWallsLayer() {
        return this.wallsLayer;
    }
}