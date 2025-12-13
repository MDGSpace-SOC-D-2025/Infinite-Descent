import Phaser from "phaser";
import { generateDungeon } from "../systems/dungeonGenerator";
import TurnManager from "../systems/turnManager";
import PlayerMovement from "../systems/PlayerMovement";

const TILE = 32;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
        this.mapW = 30;
        this.mapH = 20;
        this.grid = generateDungeon(this.mapW, this.mapH);
        this.input.once("pointerdown",()=>{
            console.log("canvas focused");
        
        })
        this.add.rectangle(480,270,200,100,0x00ffff);
        this.add.text(420,260,"game running",{
            color:"#000",
            fontSize:"16px"
        })

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

        // Create player
        this.player = this.add.rectangle(
            5 * TILE + TILE / 2,
            5 * TILE + TILE / 2,
            TILE - 4,
            TILE - 4,
            0x00ff00
        );
        this.player.tx = 5;
        this.player.ty = 5;

        // Create enemy
        this.enemy = this.add.rectangle(
            10 * TILE + TILE / 2,
            10 * TILE + TILE / 2,
            TILE - 4,
            TILE - 4,
            0xff0000
        );
        this.enemy.tx = 10;
        this.enemy.ty = 10;

        // Turn manager
        this.turns = new TurnManager();
        this.turns.setUnits([this.player, this.enemy]);
        this.activeUnit = this.turns.next();

        // Player movement system
        this.playerMovement = new PlayerMovement(
            this,
            this.player,
            this.grid,
            this.mapW,
            this.mapH,
            TILE
        );
        console.log("gamescene")
    }

    update() {
        if (this.activeUnit !== this.player) return;
        
        const moved = this.playerMovement.update();
        if (moved) {
            this.activeUnit = this.turns.next();
        }
    }
}