import Tile from './Tile.js';

export default class Tilemap {
    constructor(scene) {
        // Load map
        this.scene = scene;

        this.tiles = [];
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

        groundLayer.setScale(1);
        wallsLayer.setScale(1);

        this.addCustomTiles(map, groundLayer);

        // Return the layers to use in GameScene
        return { map, groundLayer, wallsLayer, tiles: this.tiles };
    }

    addCustomTiles(map, groundLayer) {
        const tileWidth = map.tileWidth * groundLayer.scaleX;
        const tileHeight = map.tileHeight * groundLayer.scaleY;
        
        groundLayer.forEachTile(tile => {
            const x = tile.x * tileWidth;
            const y = tile.y * tileHeight;

            // "__DEFAULT" is a built in transparent texture
            const customTile = new Tile(this.scene, x, y, "__DEFAULT", tile.layer);
            this.tiles.push(customTile);
        });
    }

    getTiles() {
        return this.tiles;
    }
}