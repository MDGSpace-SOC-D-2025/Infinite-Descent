/**
 * Player Health UI
 * ----------------
 * Creates and manages player health bar
 * - Fixed to camera (top-left corner)
 * - Shows HP text (current/max)
 * - Color changes based on health %
 * - Player name label
 */

export default class PlayerHealthUI {
  constructor(scene, player, maxHP) {
    this.scene = scene;
    this.player = player;
    this.maxHP = maxHP;

    /* ------------------------------------ */
    /* UI Configuration                     */
    /* ------------------------------------ */

    this.padding = 20;
    this.barWidth = 200;
    this.barHeight = 20;

    this.createUI();
  }

  createUI() {
    /* ------------------------------------ */
    /* Background Container                 */
    /* ------------------------------------ */

    this.bg = this.scene.add.rectangle(
      this.padding,
      this.padding,
      this.barWidth,
      this.barHeight,
      0x222222
    );
    this.bg.setOrigin(0, 0);
    this.bg.setDepth(1000);
    this.bg.setScrollFactor(0); // Fixed to camera

    /* ------------------------------------ */
    /* Health Bar (Foreground)              */
    /* ------------------------------------ */

    this.healthBar = this.scene.add.rectangle(
      this.padding + 2,
      this.padding + 2,
      this.barWidth - 4,
      this.barHeight - 4,
      0x00ff00 // Start with green
    );
    this.healthBar.setOrigin(0, 0);
    this.healthBar.setDepth(1001);
    this.healthBar.setScrollFactor(0);

    /* ------------------------------------ */
    /* HP Text Display                      */
    /* ------------------------------------ */

    this.hpText = this.scene.add.text(
      this.padding + this.barWidth / 2,
      this.padding + this.barHeight / 2,
      `${this.player.hp}/${this.maxHP}`,
      {
        fontSize: '14px',
        color: '#ffffff',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 3
      }
    );
    this.hpText.setOrigin(0.5, 0.5);
    this.hpText.setDepth(1002);
    this.hpText.setScrollFactor(0);

    /* ------------------------------------ */
    /* Player Name Label                    */
    /* ------------------------------------ */

    this.nameText = this.scene.add.text(
      this.padding,
      this.padding - 22,
      'PLAYER',
      {
        fontSize: '12px',
        color: '#00ff00',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 2
      }
    );
    this.nameText.setOrigin(0, 0);
    this.nameText.setDepth(1002);
    this.nameText.setScrollFactor(0);

    /* ------------------------------------ */
    /* Heart Icon (Optional)                */
    /* ------------------------------------ */

    this.heartIcon = this.scene.add.text(
      this.padding - 18,
      this.padding + this.barHeight / 2,
      '❤',
      {
        fontSize: '16px'
      }
    );
    this.heartIcon.setOrigin(0.5, 0.5);
    this.heartIcon.setDepth(1002);
    this.heartIcon.setScrollFactor(0);
  }

  /**
   * Update health bar
   */
  update(currentHP) {
    const healthPercent = Math.max(0, Math.min(1, currentHP / this.maxHP));

    /* ------------------------------------ */
    /* Update Bar Width                     */
    /* ------------------------------------ */

    this.healthBar.width = (this.barWidth - 4) * healthPercent;

    /* ------------------------------------ */
    /* Color Based on Health %              */
    /* ------------------------------------ */

    let color;
    if (healthPercent > 0.6) {
      color = 0x00ff00; // Green (healthy)
    } else if (healthPercent > 0.3) {
      color = 0xffaa00; // Orange (injured)
    } else {
      color = 0xff0000; // Red (critical)
    }
    this.healthBar.fillColor = color;

    /* ------------------------------------ */
    /* Update HP Text                       */
    /* ------------------------------------ */

    this.hpText.setText(`${Math.ceil(currentHP)}/${this.maxHP}`);

    /* ------------------------------------ */
    /* Pulsing Effect When Low HP           */
    /* ------------------------------------ */

    if (healthPercent < 0.3 && !this.isPulsing) {
      this.isPulsing = true;
      
      this.scene.tweens.add({
        targets: [this.healthBar, this.heartIcon],
        alpha: 0.5,
        duration: 400,
        yoyo: true,
        repeat: -1
      });
    } else if (healthPercent >= 0.3 && this.isPulsing) {
      this.isPulsing = false;
      
      this.scene.tweens.killTweensOf([this.healthBar, this.heartIcon]);
      this.healthBar.alpha = 1;
      this.heartIcon.alpha = 1;
    }
  }

  /**
   * Destroy UI elements
   */
  destroy() {
    this.bg.destroy();
    this.healthBar.destroy();
    this.hpText.destroy();
    this.nameText.destroy();
    this.heartIcon.destroy();
  }

  /**
   * Hide UI
   */
  hide() {
    this.bg.setVisible(false);
    this.healthBar.setVisible(false);
    this.hpText.setVisible(false);
    this.nameText.setVisible(false);
    this.heartIcon.setVisible(false);
  }

  /**
   * Show UI
   */
  show() {
    this.bg.setVisible(true);
    this.healthBar.setVisible(true);
    this.hpText.setVisible(true);
    this.nameText.setVisible(true);
    this.heartIcon.setVisible(true);
  }
}