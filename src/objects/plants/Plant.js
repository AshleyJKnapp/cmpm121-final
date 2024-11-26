// import Tiles from "./src/objects/scenes/Tiles.js";

export class Plant extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y) {
    super(scene, x, y);

    this.x = x;
    this.y = y;
    this.growthStage = 0; // default growthStage
  }

  // Display first growth on initialization
  init(){
    if (this.spriteArray) {
      // this.sprite.setTexture(this.spriteArray[this.growthStage]);
      this.scene.add.sprite(this.x, this.y, this.spriteArray[this.growthStage]);
      console.log("poop xy is "+this.x+" "+this.y);
    } else {
      console.warn("initializeSprite(): no sprite or spriteArray defined.");
    }
  }

  // Checks if the plant should grow and grows
  plantCheck(sun, water){
    // Base plant growth requirement check
    if (sun >= this.requiredSun && water >= this.requiredWater) {
      this.grow();
    }
  }

  // Grows the plant by increasing its growth stage and updates sprite
  grow(){
    if (this.growthStage < this.maxGrowthStage) {
      this.growthStage++;
      this.updateSprite();
    }
  }

  updateSprite() {
    if (this.sprite && this.spriteArray) {
        this.sprite.setTexture(this.spriteArray[this.growthStage]);
    } else {
        console.warn("updateSprite(): no sprite or spriteArray defined.");
    }
  }

  // Returns an array of the types of plants in adjacent cells
  getAdj(){
    let foundAdj = [];

    // TileType 0 = nothing
    // TileType above 0 is a plant
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue; // Skip this tile

        if (getTileType(dx, dy) > 0){
          foundAdj.push(checkedTile);
        }
      }
    }

    if (foundChairs >= 2){
      return true;
    }

    return foundAdj;
  }
}