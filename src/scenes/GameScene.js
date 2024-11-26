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
    }

    create() {
        // Use Tilemap class to create map
        const { groundLayer, wallsLayer, tiles } = this.tilemap.create();

        this.groundLayer = groundLayer;
        this.wallsLayer = wallsLayer;

        tiles.forEach(tile => {
            tile.setState(0);
        });

        const scale = 3;

        this.player = new Player(this, 72, 72, 'player');
        this.player.setScale(scale);

        // Add wall collision for player
        this.physics.add.collider(this.player, this.wallsLayer);

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
        
    }
}