export class Plant {
  constructor() {

    this.growthStage = 0; // default growthStage
    this.growth = 0;
    this.growthThreshold = 5;
    this.growthScaleBy = 2;
    this.fullyGrown = false;
    this.spriteObj;
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
      this.growth++;
      if (this.growth >= this.growthThreshold){
        this.growthStage++;
        this.growth = 0;
        this.growthThreshold += this.growthScaleBy;
      }
    } else {
      this.fullyGrown = true;
    }
  }

  updateSprite() {
    if (this.spriteArray) {
      return this.spriteArray[this.growthStage];
    } else {
      console.warn("updateSprite(): no sprite or spriteArray defined.");
      return null;  
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