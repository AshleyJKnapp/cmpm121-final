import Tilemap from './Tilemap.js';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        // Call the parent class constructor
        super(scene, x, y, texture);

        // Add the  this to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Properties setup
        this.setCollideWorldBounds(true);
    }
}