import Phaser from "phaser";

/**
 * PlayerMovement
 * --------------
 * Handles:
 * - WASD movement
 * - Collision with dungeon grid
 * - Directional animations (walk + idle)
 */
export default class PlayerMovement {
  constructor(scene, player, grid, mapWidth, mapHeight, tileSize, speed = 120) {
    this.scene = scene;
    this.player = player;
    this.grid = grid;
    this.mapHeight = mapHeight;
    this.mapWidth = mapWidth;
    this.tileSize = tileSize;
    this.speed = speed;

    /**
     * Keyboard input (WASD)
     */
    this.keys = scene.input.keyboard.addKeys({
      up: "W",
      down: "S",
      left: "A",
      right: "D",
    });

    /**
     * Track last facing direction
     * Used for correct idle animation
     */
    this.player.facing = this.player.facing || "down";
  }

  update(delta) {
    let vx = 0;
    let vy = 0;

    // --- INPUT ---
    if (this.keys.left.isDown) vx -= 1;
    if (this.keys.right.isDown) vx += 1;
    if (this.keys.up.isDown) vy -= 1;
    if (this.keys.down.isDown) vy += 1;

    const isMoving = vx !== 0 || vy !== 0;

    // --- ANIMATION LOGIC ---
    if (isMoving) {
      // Decide facing direction (prefer stronger axis)
      if (Math.abs(vx) > Math.abs(vy)) {
        this.player.facing = vx > 0 ? "right" : "left";
      } else {
        this.player.facing = vy > 0 ? "down" : "up";
      }

      // Play correct walk animation
      this.player.sprite.play(
        `player-walk-${this.player.facing}`,
        true
      );
    } else {
      // Not moving → play idle animation
      this.player.sprite.play(
        `player-idle-${this.player.facing}`,
        true
      );
      return;
    }

    // --- NORMALIZE DIAGONAL MOVEMENT ---
    const len = Math.hypot(vx, vy);
    vx /= len;
    vy /= len;

    // --- DELTA-BASED MOVEMENT ---
    const moveX = vx * this.speed * (delta / 1000);
    const moveY = vy * this.speed * (delta / 1000);

    this.tryMove(moveX, moveY);
  }

  /**
   * Collision-aware movement
   */
  tryMove(dx, dy) {
    const nextX = this.player.sprite.x + dx;
    const nextY = this.player.sprite.y + dy;

    const tileX = Math.floor(nextX / this.tileSize);
    const tileY = Math.floor(nextY / this.tileSize);

    // --- BOUNDS CHECK ---
    if (
      tileX < 0 ||
      tileY < 0 ||
      tileY >= this.grid.length ||
      tileX >= this.grid[0].length
    ) {
      return;
    }

    // --- WALL COLLISION ---
    // 1 = wall, 0 = floor
    if (this.grid[tileY][tileX] === 1) return;

    // --- APPLY MOVEMENT ---
    this.player.sprite.x = nextX;
    this.player.sprite.y = nextY;
  }
}
