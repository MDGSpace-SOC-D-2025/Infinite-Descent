import { generateDungeon } from "../systems/dungeonGenerator";
import Phaser from "phaser";

export default class TilemapScene extends Phaser.Scene{
    constructor(){
        super("TilemapScene");
    }

    create(){
        const tileSize=64;
        const grid=generateDungeon(30,20);

        const map=this.make.tilemap({
            data:grid,
            tileWidth:tileSize,
            tileHeight:tileSize,
        });

        const tileset=map.addTilesetImage("dungeonTiles");
        console.log(this.tileset)
        const layer=map.createLayer(0,tileset,0,0);

        const FLOOR_TILES=[0,1,2,3,4,5,6,7];

        layer.forEachTile(tile=>{
            if(tile.index===0){
                tile.index=Phaser.Utils.Array.GetRandom(FLOOR_TILES);
            }
        });
    }
}