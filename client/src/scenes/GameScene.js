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
        this.mapW = 30;
        this.mapH = 20;
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

        const eSpawn=getRandomFloorTile(this.grid);
        this.enemy=new Enemy(this,eSpawn.x,eSpawn.y,TILE)

        // Create player
        // this.player = this.add.rectangle(
        //     5 * TILE + TILE / 2,
        //     5 * TILE + TILE / 2,
        //     TILE - 4,
        //     TILE - 4,
        //     0x00ff00
        // );
                // Find valid spawn tile for player
        // const playerSpawn = getRandomFloorTile(this.grid);

        // this.player.tx = playerSpawn.x;
        // this.player.ty = playerSpawn.y;

        // this.player.x = playerSpawn.x * TILE + TILE / 2;
        // this.player.y = playerSpawn.y * TILE + TILE / 2;

        // Create enemy
        // this.enemy = this.add.rectangle(
        //     10 * TILE + TILE / 2,
        //     10 * TILE + TILE / 2,
        //     TILE - 4,
        //     TILE - 4,
        //     0xff0000
        // );
        // const enemySpawn = getRandomFloorTile(this.grid);

        // this.enemy.tx = enemySpawn.x;
        // this.enemy.ty = enemySpawn.y;

        // this.enemy.x = enemySpawn.x * TILE + TILE / 2;
        // this.enemy.y = enemySpawn.y * TILE + TILE / 2;


        // Turn manager
        
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