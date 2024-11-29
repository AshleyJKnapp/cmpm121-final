export class Table extends Plant {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.type = "table";
    // The pngs have not been actually preloaded yet
    this.spriteArray = ["egg.png", "midTable.png", "fullTable.png"];
    this.maxGrowthStage = this.spriteArray.length - 1;
    this.plantType = "table";

    // Sun + Water Growth Requirements Override
    this.requiredSun = 1;
    this.requiredWater = 2;
    
    this.init();
  }

  // plantCheck override that checks for adjacency requirements
  // toCheck is an array of adjacent tiles type values (Array of strings)
  plantCheck(sun, water, toCheck) {
    if (sun >= this.requiredSun && water >= this.requiredWater && this.checkRequirements(toCheck)) {
      this.grow();
    }
  }

  // Check if strings array contain at least 2 chairs
  checkRequirements(toCheck){
    let foundChairs = 0;

    for (let val in toCheck){
      if (val == "chair"){
        foundChairs++;
        // return true if enough adjacent chairs found
        if (foundChairs >= 2){
          return true;
        }
      }
    }

    // Return false if not enough adjacent chairs have been found
    return false;
  }
}