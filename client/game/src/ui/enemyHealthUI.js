/**
 * Enemy Health UI
 * ---------------
 * Creates and manages floating health bar above enemy
 * - Follows enemy sprite
 * - Red color theme
 * - Auto-hides when full health
 * - Shows damage numbers
 */

export default class EnemyHealthUI {
  constructor(scene, enemy, maxHP) {
    this.scene = scene;
    this.enemy = enemy;
    this.maxHP = maxHP;
    this.lastHP = maxHP;

    /* ------------------------------------ */
    /* UI Configuration                     */
    /* ------------------------------------ */

    this.barWidth = 40;
    this.barHeight = 5;
    this.offsetY = -10; // Above sprite

    this.createUI();
  }

  createUI() {
    /* ------------------------------------ */
    /* Background (Dark)                    */
    /* ------------------------------------ */

    this.bg = this.scene.add.rectangle(
      0,
      0,
      this.barWidth,
      this.barHeight,
      0x000000,
      0.8
    );
    this.bg.setOrigin(0, 0.5);
    this.bg.setDepth(100);

    /* ------------------------------------ */
    /* Health Bar (Red)                     */
    /* ------------------------------------ */

    this.healthBar = this.scene.add.rectangle(
      0,
      0,
      this.barWidth,
      this.barHeight,
      0xff0000
    );
    this.healthBar.setOrigin(0, 0.5);
    this.healthBar.setDepth(101);

    /* ------------------------------------ */
    /* Container                            */
    /* ------------------------------------ */

    this.container = this.scene.add.container(0, 0, [this.bg, this.healthBar]);
    this.container.setDepth(100);

    // Hide initially (only show when damaged)
    this.container.setAlpha(0);
  }

  /**
   * Update health bar
   */
  update(currentHP) {
    if (!this.enemy || !this.enemy.sprite || this.enemy.dead) {
      this.destroy();
      return;
    }

    /* ------------------------------------ */
    /* Update Position (Follow Sprite)      */
    /* ------------------------------------ */

    this.container.x = this.enemy.sprite.x - this.barWidth / 2;
    this.container.y = this.enemy.sprite.y - this.enemy.sprite.displayHeight + this.offsetY;

    /* ------------------------------------ */
    /* Update Bar Width                     */
    /* ------------------------------------ */

    const healthPercent = Math.max(0, Math.min(1, currentHP / this.maxHP));
    this.healthBar.width = this.barWidth * healthPercent;

    /* ------------------------------------ */
    /* Color Based on Health %              */
    /* ------------------------------------ */

    let color;
    if (healthPercent > 0.6) {
      color = 0xff4444; // Light red
    } else if (healthPercent > 0.3) {
      color = 0xff0000; // Red
    } else {
      color = 0xaa0000; // Dark red
    }
    this.healthBar.fillColor = color;

    /* ------------------------------------ */
    /* Show/Hide Logic                      */
    /* ------------------------------------ */

    // Show when damaged
    if (currentHP < this.maxHP) {
      if (this.container.alpha === 0) {
        this.scene.tweens.add({
          targets: this.container,
          alpha: 1,
          duration: 200
        });
      }
    }

    /* ------------------------------------ */
    /* Damage Number Popup                  */
    /* ------------------------------------ */

    if (currentHP < this.lastHP) {
      const damage = this.lastHP - currentHP;
      this.showDamageNumber(damage);
    }

    this.lastHP = currentHP;
  }

  /**
   * Show floating damage number
   */
  showDamageNumber(damage) {
    const damageText = this.scene.add.text(
      this.container.x + this.barWidth / 2,
      this.container.y - 15,
      `-${Math.ceil(damage)}`,
      {
        fontSize: '14px',
        color: '#ff0000',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 3
      }
    );
    damageText.setOrigin(0.5, 0.5);
    damageText.setDepth(150);

    // Float up animation
    this.scene.tweens.add({
      targets: damageText,
      y: damageText.y - 30,
      alpha: 0,
      duration: 800,
      ease: 'Cubic.easeOut',
      onComplete: () => damageText.destroy()
    });
  }

  /**
   * Flash effect when taking damage
   */
  flashDamage() {
    this.healthBar.setTint(0xffffff);
    this.scene.time.delayedCall(100, () => {
      this.healthBar.clearTint();
    });
  }

  /**
   * Destroy UI elements
   */
  destroy() {
    if (this.container) {
      this.container.destroy();
    }
    if (this.bg) {
      this.bg.destroy();
    }
    if (this.healthBar) {
      this.healthBar.destroy();
    }
  }

  /**
   * Hide UI
   */
  hide() {
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      duration: 200
    });
  }

  /**
   * Show UI
   */
  show() {
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 200
    });
  }

  /**
   * Set visibility instantly
   */
  setVisible(visible) {
    this.container.setAlpha(visible ? 1 : 0);
  }
}