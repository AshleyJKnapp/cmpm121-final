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
        const { map, groundLayer, wallsLayer } = this.tilemap.create();

        this.player = new Player(this, 100, 100, 'player');
        this.player.setScale(0.5);

        // Add wall collision for player
        this.physics.add.collider(this.player, this.wallsLayer);

        // Movement keys
        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.world.createDebugGraphic();
    }

    update() {
        this.player.update(this.cursors);
    }
}