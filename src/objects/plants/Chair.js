import { Plant } from "./Plant.js";

export class Chair extends Plant {
  constructor() {
    super();

    this.type = "chair";
    this.spriteArray = ["egg", "woodpile", "chair"];
    this.maxGrowthStage = this.spriteArray.length - 1;
    
    // Sun + Water Growth Requirements Override
    this.requiredSun = 2;
    this.requiredWater = 1;
    
  }
}