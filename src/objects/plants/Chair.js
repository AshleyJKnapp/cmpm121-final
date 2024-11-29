import { Plant } from "./Plant.js";

export class Chair extends Plant {
  constructor(scene, x, y) {
    super(scene, x, y);

    // this.spriteArray = ["egg.png", "midChair.png", "fullChair.png"];
    this.spriteArray = ['testPlant'];
    this.maxGrowthStage = this.spriteArray.length - 1;
    this.plantType = "chair";

    // Sun + Water Growth Requirements Override
    this.requiredSun = 1;
    this.requiredWater = 2;
    
    this.init();
  }
}