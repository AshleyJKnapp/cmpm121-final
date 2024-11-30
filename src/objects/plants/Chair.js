import { Plant } from "./Plant.js";

export class Chair extends Plant {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.type = "chair";
    this.spriteArray = ["egg", "woodpile", "chair"];
    this.maxGrowthStage = this.spriteArray.length - 1;
    
    // Sun + Water Growth Requirements Override
    this.requiredSun = 1;
    this.requiredWater = 2;
    
    this.init();
  }
}