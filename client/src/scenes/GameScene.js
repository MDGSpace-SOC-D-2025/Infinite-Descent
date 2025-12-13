import Phaser from "phaser";
import { generateDungeon } from "../systems/dungeonGenerator";
import PlayerMovement from "../systems/PlayerMovement";
import {getRandomFloorTile} from "../systems/spawnUtils.js"
import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";

const TILE = 32;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.scale.on("resize",(gameSize)=>{
            const{width,height}=gameSize;
            this.cameras.resize(width,height);
        })
        this.cameras.main.setBounds(0,0,this.mapW*TILE,this.mapH*TILE)
        this.cameras.main.startFollow(this.player.sprite,true,0.08,0.08)
     
        this.grid = generateDungeon(this.mapW, this.mapH);

        // Draw the dungeon
        for (let y = 0; y < this.mapH; y++) {
            for (let x = 0; x < this.mapW; x++) {
                const color = this.grid[y][x] === 0 ? 0x333333 : 0x111111;

                this.add.rectangle(
                    x * TILE,
                    y * TILE,
                    TILE,
                    TILE,
                    color
                ).setOrigin(0);
            }
        }
        const pSpawn=getRandomFloorTile(this.grid);
        this.player=new Player(this,pSpawn.x,pSpawn.y,TILE);

        // const eSpawn=getRandomFloorTile(this.grid);
        // this.enemy=new Enemy(this,eSpawn.x,eSpawn.y,TILE)

      
        
        // Player movement system
        this.playerMovement = new PlayerMovement(
            this,
            this.player,
            this.grid,
            this.mapW,
            this.mapH,
            TILE
        );
    }

    update(time,delta) {
        // Player can always move (turn system disabled for now)
        this.playerMovement.update(delta);
    }
}