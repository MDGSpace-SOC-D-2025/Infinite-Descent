import Phaser from "phaser";

// Dungeon & utils
import { generateDungeon } from "../systems/dungeonGenerator.js";
import { getRandomFloorTile } from "../systems/spawnUtils.js";
import { getBiomeForFloor } from "../systems/biomeManager.js";

// Player
import Player from "../entities/Player.js";
import PlayerMovement from "../systems/PlayerMovement.js";
import { createPlayerAnimations } from "../animations/playerAnimations.js";
import PlayerAttackSystem from "../systems/playerAttack/playerAttackSystem.js";

// NPC
import NPC from "../entities/NPC.js";
import NPCInteraction from "../systems/npcInteraction.js";
import ChatUI from "../ui/chatUI.js";
import { createNPCAnimations } from "../animations/npcAnimations.js";

// Enemy 
import Enemy from "../entities/Enemy.js";
import EnemyMovement from "../systems/EnemyMovement.js";
import EnemyAttackSystem from "../systems/enemyAttack/enemyAttackSystem.js";
import { createEnemyAnimations } from "../animations/enemyAnimations.js";

// UI
import PlayerHealthUI from "../ui/playerHealthUI.js";
import EnemyHealthUI from "../ui/enemyHealthUI.js";

const TILE = 64;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    /* ---------------------------------------------------- */
    /* 1. MAP SETUP WITH BIOME                              */
    /* ---------------------------------------------------- */

    this.mapW = 30;
    this.mapH = 20;
    
    this.grid = generateDungeon(this.mapW, this.mapH);

    this.map = this.make.tilemap({
      data: this.grid,
      tilewidth: TILE,
      tileHeight: TILE
    });

    this.tileset = this.map.addTilesetImage("dungeonTiles");
    this.floorLayer = this.map.createLayer(0, this.tileset, 0, 0);

    for (let y = 0; y < this.mapH; y++) {
      for (let x = 0; x < this.mapW; x++) {
        const color = this.grid[y][x] === 0 ? 0x333333 : 0x111111;
        const FLOOR_TILES = [0, 1, 2, 3, 4, 5, 6, 7];

        this.add.rectangle(x * TILE, y * TILE, TILE, TILE, color).setOrigin(0);

        this.floorLayer.forEachTile(tile => {
          if (tile.index === 0) {
            tile.index = Phaser.Utils.Array.GetRandom(FLOOR_TILES);
          }
        });
        this.floorLayer.setDepth(0);
      }
    }

    /* ---------------------------------------------------- */
    /* 2. PLAYER SETUP                                      */
    /* ---------------------------------------------------- */

    const pSpawn = getRandomFloorTile(this.grid);
    this.player = new Player(this, pSpawn.x, pSpawn.y, TILE);

    // Create player animations
    createPlayerAnimations(this);

    // Start with idle animation
    this.player.facing = "down";
    this.player.sprite.play("player-idle-down");

    console.log("✅ Player spawned at:", pSpawn);

    /* ---------------------------------------------------- */
    /* 3. CAMERA SETUP                                      */
    /* ---------------------------------------------------- */

    this.cameras.main.setBounds(
      0,
      0,
      this.mapW * TILE,
      this.mapH * TILE
    );

    this.cameras.main.startFollow(
      this.player.sprite,
      true,
      0.08,
      0.08
    );

    this.cameras.main.setZoom(1);

    /* ---------------------------------------------------- */
    /* 4. PLAYER MOVEMENT SYSTEM                            */
    /* ---------------------------------------------------- */

    this.playerMovement = new PlayerMovement(
      this,
      this.player,
      this.grid,
      this.mapW,
      this.mapH,
      TILE,
      120
    );

    /* ---------------------------------------------------- */
    /* 5. CREATE ENEMY                                      */
    /* ---------------------------------------------------- */

    const eSpawn = getRandomFloorTile(this.grid);
    this.enemy = new Enemy(this, eSpawn.x, eSpawn.y, TILE);
    
    // Create enemy animations
    // createEnemyAnimations(this);
    
    this.enemy.facing = "down";
    this.enemy.sprite.play("enemy-idle-down");

    /* ---------------------------------------------------- */
    /* 6. ENEMY AI SYSTEMS                                  */
    /* ---------------------------------------------------- */

    // Movement AI
    this.enemyMovement = new EnemyMovement(
      this,
      this.enemy,
      this.grid,
      this.player,
      TILE
    );

    // Attack AI
    this.enemyAttackSystem = new EnemyAttackSystem(
      this,
      this.enemy,
      this.player,
      TILE
    );

    /* ---------------------------------------------------- */
    /* 7. PLAYER ATTACK SYSTEM                              */
    /* ---------------------------------------------------- */

    this.attackSystem = new PlayerAttackSystem(
      this,
      this.player,
      [this.enemy],
      TILE
    );

    /* ---------------------------------------------------- */
    /* 8. HEALTH UI SYSTEMS                                 */
    /* ---------------------------------------------------- */

    // Player health UI (top-left corner)
    this.playerHealthUI = new PlayerHealthUI(
      this,
      this.player,
      this.player.maxHP
    );
    
    // Enemy health UI (floating above sprite)
    this.enemyHealthUI = new EnemyHealthUI(
      this,
      this.enemy,
      this.enemy.hp
    );

    // Clean up enemy health UI when enemy dies
    this.enemy.setOnDeath((enemy) => {
      if (this.enemyHealthUI) {
        this.enemyHealthUI.destroy();
        this.enemyHealthUI = null;
      }
    });

    /* ---------------------------------------------------- */
    /* 9. NPC + CHAT SYSTEM                                 */
    /* ---------------------------------------------------- */

    const nSpawn = getRandomFloorTile(this.grid);
    createNPCAnimations(this);
    
    this.npc = new NPC(this, nSpawn.x, nSpawn.y, TILE);

    this.chatUI = new ChatUI(this);

    this.npcInteraction = new NPCInteraction(
      this,
      this.player,
      this.npc,
      this.chatUI
    );

    /* ---------------------------------------------------- */
    /* 10. HANDLE RESIZE (FULLSCREEN SUPPORT)               */
    /* ---------------------------------------------------- */

    this.scale.on("resize", (gameSize) => {
      const { width, height } = gameSize;
      this.cameras.main.setSize(width, height);
    });

    console.log("✅ Game scene initialized successfully!");
  }

  update(time, delta) {
    /* ------------------------------------ */
    /* Player Systems                       */
    /* ------------------------------------ */

    // Movement + animation
    this.playerMovement.update(delta);
    
    // Attack system
    this.attackSystem.update(delta);

    // Update player health UI
    this.playerHealthUI.update(this.player.hp);

    /* ------------------------------------ */
    /* Enemy Systems                        */
    /* ------------------------------------ */

    if (this.enemy && !this.enemy.dead && this.enemy.sprite) {
      // Movement AI
      this.enemyMovement.update(delta);
      
      // Attack AI
      this.enemyAttackSystem.update(delta);
      
      // Update enemy health UI
      if (this.enemyHealthUI) {
        this.enemyHealthUI.update(this.enemy.hp);
      }
    }

    /* ------------------------------------ */
    /* NPC Interaction                      */
    /* ------------------------------------ */

    this.npcInteraction.update();
  }
}