export class Chair extends Plant {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.spriteArray = ["egg.png", "midTable.png", "fullTable.png"];
    this.maxGrowthStage = this.spriteArray.length - 1;
    this.plantType = "table";

    // Sun + Water Growth Requirements Override
    this.requiredSun = 1;
    this.requiredWater = 2;
    
    this.init();
  }

  // plantCheck override that checks for adjacent requirements
  plantCheck(sun, water) {
    if (sun >= this.requiredSun && water >= this.requiredWater && this.checkAdj()) {
      this.grow();
    }
  }

  // Check if adjacent have at least 2 chairs
  checkAdj(){
    let adjVals = this.getAdj();
    let foundChairs = 0;

    for (let val in adjVals){
      // TileType 1 = Chair
      // *NOTE: this number may change depending on however the tiles are set up, im not working on tiles so idk*
      if (val == 1){
        foundChairs++;
      }
    }

    // return true if neighbors found, false otherwise
    if (foundChairs >= 2){
      return true;
    }

    return false;
  }
}