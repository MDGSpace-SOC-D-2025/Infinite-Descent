import Phaser from "phaser";

// Dungeon & utils
import { generateDungeon } from "../systems/dungeonGenerator.js";
import { getRandomFloorTile } from "../systems/spawnUtils.js";

// Player
import Player from "../entities/Player.js";
import PlayerMovement from "../systems/PlayerMovement.js";
import { createPlayerAnimations } from "../../animations/playerAnimations.js";

// NPC
import NPC from "../entities/NPC.js";
import NPCInteraction from "../systems/npcInteraction.js";
import ChatUI from "../ui/chatUI.js";
import Enemy from "../entities/Enemy.js";
import EnemyMovement from "../systems/EnemyMovement.js";
import { createEnemyAnimations } from "../../animations/enemyAnimations.js";
import {TilemapsScene} from "./TilemapScene.js"

const TILE = 64;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  

  create() {
    console.log("game")
    /* ---------------------------------------------------- */
    /* 1. MAP SETUP                                         */
    /* ---------------------------------------------------- */

    this.mapW = 30;
    this.mapH = 20;

    // Generate dungeon grid (0 = floor, 1 = wall)
    this.grid = generateDungeon(this.mapW, this.mapH);

    /* ---------------------------------------------------- */
    /* 2. DRAW DUNGEON                  */
    /* ---------------------------------------------------- */
    this.map=this.make.tilemap({
      data:this.grid,
      tileWidth:TILE,
      tileHeight:TILE
    });

    this.tileset=this.map.addTilesetImage("dungeonTiles");

    this.floorLayer=this.map.createLayer(0,this.tileset,0,0);

    const FLOOR_TILES=[0,1,2,3,4,5,6,7]

    this.floorLayer.forEachTile(tile=>{
      if(tile.index===0){
        tile.index=Phaser.Utils.Array.GetRandom(FLOOR_TILES);
      }
    });
    this.floorLayer.setDepth(0);

    

    /* ---------------------------------------------------- */
    /* 3. CREATE PLAYER                                     */
    /* ---------------------------------------------------- */

    const pSpawn = getRandomFloorTile(this.grid);
    this.player = new Player(this, pSpawn.x, pSpawn.y, TILE);

   
    // Create player animations ONCE
    createPlayerAnimations(this);

    // Default facing direction
    this.player.facing = "down";
    this.player.sprite.play("player-idle-down");

    /* ---------------------------------------------------- */
    /* 4. CAMERA SETUP                                      */
    /* ---------------------------------------------------- */

    this.cameras.main.setBounds(
      0,
      0,
      this.mapW * TILE,
      this.mapH * TILE
    );

    this.cameras.main.startFollow(
      this.player.sprite,
      true,  // round pixels (pixel-art friendly)
      0.08,  // smooth follow X
      0.08   // smooth follow Y
    );

    this.cameras.main.setZoom(2);

    /* ---------------------------------------------------- */
    /* 5. PLAYER MOVEMENT SYSTEM                            */
    /* ---------------------------------------------------- */

    this.playerMovement = new PlayerMovement(
      this,
      this.player,
      this.grid,
      this.mapW,
      this.mapH,
      TILE,
      120 // speed
    );

    /* ---------------------------------------------------- */
    /* 6. CREATE ENEMY                                      */
    /* ---------------------------------------------------- */
    const eSpawn = getRandomFloorTile(this.grid);
    this.enemy = new Enemy(this, eSpawn.x, eSpawn.y, TILE);

    // createEnemyAnimations(this);
    this.enemy.facing = "down";
    this.enemy.sprite.play("enemy-idle-down");

    this.enemyMovement = new EnemyMovement(
        this,
        this.enemy,
        this.grid,
        this.player,
        TILE,
    );

    /* ---------------------------------------------------- */
    /* 7. NPC + CHAT SYSTEM                                 */
    /* ---------------------------------------------------- */

    // TEMP NPC spawn (later use getRandomFloorTile)
    this.npc = new NPC(this, 8, 8, TILE);

    this.chatUI = new ChatUI(this);

    this.npcInteraction = new NPCInteraction(
      this,
      this.player,
      this.npc,
      this.chatUI
    );

    /* ---------------------------------------------------- */
    /* 8. HANDLE RESIZE (FULLSCREEN SUPPORT)                */
    /* ---------------------------------------------------- */

    this.scale.on("resize", (gameSize) => {
      const { width, height } = gameSize;
      this.cameras.main.setSize(width, height);
    });
  }

  update(time, delta) {
    // Player movement + animation
    this.playerMovement.update(delta);
    this.enemyMovement.update(delta);

    // NPC interaction
    this.npcInteraction.update();
  }
}