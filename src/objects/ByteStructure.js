import Tilemap from "../objects/Tilemap.js";
import { Chair } from "../objects/plants/Chair.js";
import { Plant } from "../objects/plants/Plant.js";
import { Table } from "../objects/plants/Table.js";
import { Wall } from "../objects/plants/Wall.js";

export { Tilemap, Plant, Chair, Table, Wall };
export default class ByteStructure {
    constructor(numTiles) {
        this.numTiles = numTiles;

        // Each Tile will take up 9 bytes (water, sun, collides, position (2 using 2 bytes => 4), plantType, growthStage, growth, fullyGrown)
        this.byteArray = new Uint8Array(numTiles * 11);
    }

    setTileAttributes(index, { water = 0, sun = 0, collides = 0, x =  0, y = 0, plantType = null, growthStage = null, growth = null, fullyGrown = null }) {
        let bytesPerTile = 11;
        let offset = index * bytesPerTile;
        
        // 3 bytes for tile attributes
        this.byteArray[offset] = water;
        this.byteArray[offset + 1] = sun;
        this.byteArray[offset + 2] = collides;

        // 4 bytes for tile position
        this.byteArray[offset + 3] = (x >> 8) & 0xFF; // Most significant byte of X
        this.byteArray[offset + 4] = x & 0xFF; // Least significant byte of X
        this.byteArray[offset + 5] = (y >> 8) & 0xFF; // Most significant byte of Y
        this.byteArray[offset + 6] = y & 0xFF; // Least significant byte of Y

        // 4 bytes for plant attributes
        this.byteArray[offset + 7] = plantType;
        this.byteArray[offset + 8] = growthStage;
        this.byteArray[offset + 9] = growth;
        this.byteArray[offset + 10] = fullyGrown;
    }

    getTileAttributes(index) {
        let bytesPerTile = 11;
        let offset = index * bytesPerTile;

        return {
            water: this.byteArray[offset],
            sun: this.byteArray[offset + 1],
            collides: this.byteArray[offset + 2],
            x: this.byteArray[offset + 3],
            y: this.byteArray[offset + 4],
            plantType: this.byteArray[offset + 5],
            growthStage: this.byteArray[offset + 6],
            growth: this.byteArray[offset + 7],
            fullyGrown: this.byteArray[offset + 8]
        };
    }
}