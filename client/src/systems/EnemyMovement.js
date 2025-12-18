import Phaser from "phaser";

/**
 * EnemyMovement
 * -------------
 * States:
 * - wander: random movement
 * - chase: moves toward player
 */
export default class EnemyMovement {
  constructor(scene, enemy, grid, player, tileSize) {
    this.scene = scene;
    this.enemy = enemy;
    this.player = player;
    this.grid = grid;
    this.tileSize = tileSize;

    // AI config
    this.speed = 60;
    this.detectionRadius = 5 * tileSize; // 5 tiles
    this.state = "wander";

    // Wander behavior
    this.wanderDir = { x: 0, y: 0 };
    this.wanderTimer = 0;

    this.pickRandomDirection();
  }

  update(delta) {
    const dist = Phaser.Math.Distance.Between(
      this.enemy.sprite.x,
      this.enemy.sprite.y,
      this.player.sprite.x,
      this.player.sprite.y
    );

    // State switch
    this.state = dist < this.detectionRadius ? "chase" : "wander";

    if (this.state === "wander") {
      this.updateWander(delta);
    } else {
      this.updateChase(delta);
    }

    // Update animations
    this.updateAnimation();
  }

  /* ---------------- WANDER ---------------- */

  updateWander(delta) {
    this.wanderTimer -= delta;

    if (this.wanderTimer <= 0) {
      this.pickRandomDirection();
    }

    this.tryMove(
      this.wanderDir.x * this.speed * (delta / 1000),
      this.wanderDir.y * this.speed * (delta / 1000)
    );
  }

  pickRandomDirection() {
    const dirs = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 0, y: 0 }, // idle pause
    ];

    this.wanderDir = Phaser.Utils.Array.GetRandom(dirs);
    this.wanderTimer = Phaser.Math.Between(600, 1400);
  }

  /* ---------------- CHASE ---------------- */

  updateChase(delta) {
    const dx = this.player.sprite.x - this.enemy.sprite.x;
    const dy = this.player.sprite.y - this.enemy.sprite.y;

    const len = Math.hypot(dx, dy);
    if (len === 0) return;

    const vx = dx / len;
    const vy = dy / len;

    // Update facing
    if (Math.abs(vx) > Math.abs(vy)) {
      this.enemy.facing = vx > 0 ? "right" : "left";
    } else {
      this.enemy.facing = vy > 0 ? "down" : "up";
    }

    this.tryMove(
      vx * this.speed * (delta / 1000),
      vy * this.speed * (delta / 1000)
    );
  }

  /* ---------------- ANIMATION ---------------- */

  updateAnimation() {
    // Check if actually moving (velocity > 0)
    const isMoving = (this.wanderDir.x !== 0 || this.wanderDir.y !== 0) && this.state === "wander" 
                     || this.state === "chase";

    if (isMoving) {
      // Update facing for wander mode
      if (this.state === "wander" && (this.wanderDir.x !== 0 || this.wanderDir.y !== 0)) {
        if (Math.abs(this.wanderDir.x) > Math.abs(this.wanderDir.y)) {
          this.enemy.facing = this.wanderDir.x > 0 ? "right" : "left";
        } else {
          this.enemy.facing = this.wanderDir.y > 0 ? "down" : "up";
        }
      }

      // Only play animation if not already playing
      const currentAnim = this.enemy.sprite.anims.currentAnim;
      const targetAnim = `enemy-walk-${this.enemy.facing}`;
      
      if (!currentAnim || currentAnim.key !== targetAnim) {
        this.enemy.sprite.play(targetAnim);
      }
    } else {
      // Only play idle if not already playing
      const currentAnim = this.enemy.sprite.anims.currentAnim;
      const targetAnim = `enemy-idle-${this.enemy.facing}`;
      
      if (!currentAnim || currentAnim.key !== targetAnim) {
        this.enemy.sprite.play(targetAnim);
      }
    }
  }

  /* ---------------- COLLISION ---------------- */

  tryMove(dx, dy) {
    const nextX = this.enemy.sprite.x + dx;
    const nextY = this.enemy.sprite.y + dy;

    const tileX = Math.floor(nextX / this.tileSize);
    const tileY = Math.floor(nextY / this.tileSize);

    // Bounds check
    if (
      tileX < 0 ||
      tileY < 0 ||
      tileY >= this.grid.length ||
      tileX >= this.grid[0].length
    )
      return;

    // Wall collision (1 = wall)
    if (this.grid[tileY][tileX] === 1) return;

    this.enemy.sprite.x = nextX;
    this.enemy.sprite.y = nextY;
  }
}