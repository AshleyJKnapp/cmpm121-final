export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        // Call the parent class constructor
        super(scene, x, y, texture);

        // Add the player to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Properties setup
        this.setCollideWorldBounds(true);
        this.speed = 500; // Player's speed
    }

    update(cursors) {
        // Restart the velocity
        this.setVelocity(0);

        // Movement
        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        }
        else if (cursors.right.isDown) {
            this.setVelocityX(this.speed);
        }

        if (cursors.up.isDown) {
            this.setVelocityY(-this.speed);
        }
        else if (cursors.down.isDown) {
            this.setVelocityY(this.speed);
        }
    }
}