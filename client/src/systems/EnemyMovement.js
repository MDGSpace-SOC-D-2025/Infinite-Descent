import Phaser from "phaser";

/**
 * EnemyMovement
 * -------------
 * States:
 * - wander: random movement
 * - chase: moves toward player
 */
export default class EnemyMovement {
  constructor(scene, enemy, player, grid, tileSize) {
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

    // Update facing (for future animations)
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
