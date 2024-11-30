// import Tiles from "./src/objects/scenes/Tiles.js";

export class Plant extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y) {
    super(scene, x, y);

    this.x = x;
    this.y = y;
    this.growthStage = 0; // default growthStage
    this.spriteObj;
  }

  // Display first growth on initialization
  init(){
    if (this.spriteArray) {
      console.log("placing thingy at "+this.x+" "+this.y);
      this.spriteObj = this.scene.add.sprite(this.x, this.y, this.spriteArray[this.growthStage]);
    } else {
      console.warn("initializeSprite(): no sprite or spriteArray defined.");
    }
  }

  // Checks if the plant should grow and grows
  // toCheck should not be used if there are no growing requirements
  plantCheck(sun, water, toCheck){
    // Base plant growth requirement check
    if (sun >= this.requiredSun && water >= this.requiredWater && this.checkRequirements(toCheck)) {
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
    if (this.spriteArray) {
      this.spriteObj.setTexture(this.spriteArray[this.growthStage]);
    } else {
        console.warn("updateSprite(): no sprite or spriteArray defined.");
    }
  }

  // Returns true as default if there are no requirements to grow
  checkRequirements(_toCheck){
    return true;
  }

  // Returns the plant type, set in each class
  getType(){
    return this.type;
  }
}