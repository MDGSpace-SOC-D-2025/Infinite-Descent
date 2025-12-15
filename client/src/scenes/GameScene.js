import Phaser from "phaser";
import { generateDungeon } from "../systems/dungeonGenerator";
import PlayerMovement from "../systems/PlayerMovement";
import {getRandomFloorTile} from "../systems/spawnUtils.js"
import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";
import NPC from "../entities/NPC.js";
import ChatUI from "../ui/chatUI.js";
import NPCInteraction from "../systems/npcInteraction.js";

const TILE = 32;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    create() {
    // FIRST: Set map dimensions
    this.mapW = 30;
    this.mapH = 20;
    
    // SECOND: Generate dungeon
    this.grid = generateDungeon(this.mapW, this.mapH);

    // THIRD: Draw the dungeon
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
    
    // FOURTH: Create player
    const pSpawn = getRandomFloorTile(this.grid);
    this.player = new Player(this, pSpawn.x, pSpawn.y, TILE);

    // FIFTH: Setup camera (AFTER player exists)
    this.cameras.main.setBounds(0, 0, this.mapW * TILE, this.mapH * TILE);
    this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);

    this.npc=new NPC(this,8,8,TILE);
    this.ChatUI=new ChatUI(this);
    this.npcInteraction=new NPCInteraction(
        this,
        this.player,
        this.npc,
        this.ChatUI
    )
    
    // Handle resize
    this.scale.on("resize", (gameSize) => {
        const {width, height} = gameSize;
        this.cameras.main.setSize(width, height);
    });

    // Create player movement system
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
        this.npcInteraction.update();
    }
}