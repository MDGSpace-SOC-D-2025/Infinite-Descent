/**
 * Player Entity
 * -------------
 * Responsible for:
 * - creating the player object
 * - storing tile position
 * - health management
 */

export default class Player {
  constructor(scene, tileX, tileY, tileSize) {
    this.scene = scene;
    this.tx = tileX;
    this.ty = tileY;
    this.hp = 100;
    this.maxHP = 100;
    this.dead = false;

    const x = tileX * tileSize + tileSize / 2;
    const y = tileY * tileSize + tileSize / 2;

    this.sprite = scene.add.sprite(x, y, "player");
    this.sprite.setOrigin(0.5, 1);

    this.sprite.setScale(1.5);
    this.sprite.setDepth(10);
    this.facing = "down";
  }

  takeDamage(amount) {
    if (this.dead) return;

    this.hp -= amount;
    console.log("Player HP:", this.hp);

    // Flash effect
    this.sprite.setTint(0xff0000);
    this.scene.time.delayedCall(100, () => {
      if (this.sprite && !this.dead) {
        this.sprite.clearTint();
      }
    });

    // Camera shake
    this.scene.cameras.main.shake(100, 0.003);

    if (this.hp <= 0) {
      this.hp = 0;
      this.die();
    }
  }

  heal(amount) {
    if (this.dead) return;

    this.hp = Math.min(this.maxHP, this.hp + amount);
    console.log("Player healed! HP:", this.hp);

    // Green flash
    this.sprite.setTint(0x00ff00);
    this.scene.time.delayedCall(200, () => {
      if (this.sprite && !this.dead) {
        this.sprite.clearTint();
      }
    });
  }

  die() {
    this.dead = true;
    console.log("Player died!");

    // Death animation
    this.scene.tweens.add({
      targets: this.sprite,
      alpha: 0,
      angle: 90,
      scale: 0.5,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        // Game over screen could go here
        this.scene.add.text(
          this.scene.cameras.main.centerX,
          this.scene.cameras.main.centerY,
          'GAME OVER\nPress R to Restart',
          {
            fontSize: '48px',
            color: '#ff0000',
            fontStyle: 'bold',
            align: 'center'
          }
        ).setOrigin(0.5).setScrollFactor(0).setDepth(2000);

        // Restart on R key
        this.scene.input.keyboard.once('keydown-R', () => {
          this.scene.scene.restart();
        });
      }
    });
  }
}