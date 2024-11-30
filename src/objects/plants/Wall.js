import { Plant } from "./Plant.js";

export class Wall extends Plant {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.type = "wall";
    this.spriteArray = ["egg", "woodpile", "wall"];
    this.maxGrowthStage = this.spriteArray.length - 1;

    // Sun + Water Growth Requirements Override
    this.requiredSun = 1;
    this.requiredWater = 2;
    // The max pixel distance two wall corners can be from each other
    this.wallRange = 112;
    
    this.init();
  }

  // plantCheck override that checks for adjacent requirements
  // toCheck is an array of adjacent tiles type values (Array of strings)
  plantCheck(sun, water, toCheck) {
    if (!toCheck){
      console.warn("Table.js: plantCheck(): no array to check provided.");
    }
    if (sun >= this.requiredSun && water >= this.requiredWater && this.checkRequirements(toCheck)) {
      this.grow();
    }
  }

  // Check if the given walls have x, y values near enough to draw a wall in between
  // the player should place the wall corners down, not the whole wall
  // ****NOTE: current code tries to account for if there is enough to connect to a wall both vertically and horizontally
  // it should probably return the array index number of the wall/walls that it can connect to? so then gamescene handling the
  // wall connection knows which walls it needs to draw the connection in between****
  checkRequirements(toCheck){
    let wallCheck = 0;

    for (let val in toCheck){
      if (val.getType() != "wall"){
        console.warn('Wall.js: checkRequirements(): array contains a non "wall" type.');
      }
      // Check for walls along this X
      if (val.x == this.x){
        // Check if the wall is close enough
        if (Math.abs(val.y - this.y) < this.wallRange){
          wallCheck++;
        }
      }

      // Check for walls along this Y
      if (val.y == this.y){
        // Check if the wall is close enough
        if (Math.abs(val.x - this.x) < this.wallRange){
          wallCheck++;
        }
      }
    }
    
    // Return true there is a wall to connect to
    if (wallCheck >= 2){
      return true;
    }

    // Return false if not enough adjacent chairs have been found
    return false;
  }
}