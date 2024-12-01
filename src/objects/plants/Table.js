import { Plant } from "./Plant.js";

export class Table extends Plant {
  constructor() {
    super();

    this.type = "table";
    this.spriteArray = ["egg", "woodpile", "table"];
    this.maxGrowthStage = this.spriteArray.length - 1;

    // Sun + Water Growth Requirements Override
    this.requiredSun = 4;
    this.requiredWater = 2;
    
  }

  // plantCheck override that checks for adjacency requirements
  // toCheck is an array of adjacent tiles type values (Array of strings)
  plantCheck(sun, water, toCheck) {
    if (!toCheck){
      console.warn("Table.js: plantCheck(): no array to check provided.");
    }
    if (sun >= this.requiredSun && water >= this.requiredWater && this.checkRequirements(toCheck)) {
      this.grow();
    }
  }

  // Check if strings array contain at least 2 chairs
  checkRequirements(toCheck){
    let foundChairs = 0;

    for (let i = 0; i < toCheck.length; i++){
      let val = toCheck[i];

      if (val.type == "chair"){
        foundChairs++;

        // Return true if enough adjacent chairs found
        if (foundChairs >= 2){
          return true;
        }
      }
    }

    // Return false if not enough adjacent chairs have been found
    return false;
  }
}