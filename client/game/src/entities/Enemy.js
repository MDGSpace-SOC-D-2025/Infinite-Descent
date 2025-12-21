/**
 * Enemy Entity
 * ------------
 * Same structure as Player
 * AI will be added later
 */

export default class Enemy {
  constructor(scene, tileX, tileY, tileSize) {
    this.scene = scene; // FIXED: Store scene reference
    this.tx = tileX;
    this.ty = tileY;
    this.hp = 40;
    this.dead = false;

    const x = tileX * tileSize + tileSize / 2;
    const y = tileY * tileSize + tileSize / 2;

    this.sprite = scene.add.sprite(x, y, "enemy");
    this.sprite.setOrigin(0.5, 1);

    this.sprite.setScale(1.5);
    this.sprite.setDepth(10);
    this.facing = "down";
  }

  takeDamage(amount) {
    if (this.dead) return;

    this.hp -= amount;
    console.log("Enemy HP:", this.hp);

    // Flash effect
    this.sprite.setTint(0xff0000);
    this.scene.time.delayedCall(100, () => {
      if (this.sprite && !this.dead) {
        this.sprite.clearTint();
      }
    });

    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this.dead = true;
    console.log("Enemy died!");

    // Notify that enemy is dead (for health UI cleanup)
    if (this.onDeath) {
      this.onDeath(this);
    }

    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0,
      scale: 0,
      duration: 300,
      ease: 'Back.easeIn',
      onComplete: () => {
        if (this.sprite) {
          this.sprite.destroy();
        }
      }
    });
  }

  /**
   * Set death callback
   */
  setOnDeath(callback) {
    this.onDeath = callback;
  }
}