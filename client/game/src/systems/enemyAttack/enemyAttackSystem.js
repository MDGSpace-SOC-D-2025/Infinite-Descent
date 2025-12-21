import Phaser from "phaser";
import performMeleeAttack from "./meleeAttack.js";
import performRangedAttack from "./rangedAttack.js";

/**
 * Enemy Attack System
 * -------------------
 * Manages enemy attack behavior
 * - Decides when to attack
 * - Chooses attack type based on distance
 * - Manages cooldowns
 */

export default class EnemyAttackSystem {
  constructor(scene, enemy, player, tileSize) {
    this.scene = scene;
    this.enemy = enemy;
    this.player = player;
    this.tileSize = tileSize;

    /* ------------------------------------ */
    /* Attack Configuration                 */
    /* ------------------------------------ */

    this.meleeRange = 1.5 * tileSize;  // 1.5 tiles
    this.rangedRange = 6 * tileSize;   // 6 tiles
    
    this.meleeDamage = 10;
    this.rangedDamage = 5;

    /* ------------------------------------ */
    /* Cooldown System (ms)                 */
    /* ------------------------------------ */

    this.meleeCooldown = 0;
    this.rangedCooldown = 0;
    
    this.meleeDelay = 1000;   // 1 second
    this.rangedDelay = 2000;  // 2 seconds
  }

  update(delta) {
    if (!this.enemy || this.enemy.dead || !this.player || this.player.dead) {
      return;
    }

    /* ------------------------------------ */
    /* Reduce Cooldowns                     */
    /* ------------------------------------ */

    this.meleeCooldown = Math.max(0, this.meleeCooldown - delta);
    this.rangedCooldown = Math.max(0, this.rangedCooldown - delta);

    /* ------------------------------------ */
    /* Calculate Distance to Player         */
    /* ------------------------------------ */

    const dist = Phaser.Math.Distance.Between(
      this.enemy.sprite.x,
      this.enemy.sprite.y,
      this.player.sprite.x,
      this.player.sprite.y
    );

    /* ------------------------------------ */
    /* Attack Decision Logic                */
    /* ------------------------------------ */

    // Priority 1: Melee attack (if in range)
    if (dist <= this.meleeRange && this.meleeCooldown <= 0) {
      performMeleeAttack(
        this.scene,
        this.enemy,
        this.player,
        this.meleeDamage
      );
      this.meleeCooldown = this.meleeDelay;
    }
    // Priority 2: Ranged attack (if player is far but visible)
    else if (
      dist > this.meleeRange && 
      dist <= this.rangedRange && 
      this.rangedCooldown <= 0
    ) {
      performRangedAttack(
        this.scene,
        this.enemy,
        this.player,
        this.rangedDamage
      );
      this.rangedCooldown = this.rangedDelay;
    }
  }

  /* ------------------------------------ */
  /* Helper Methods                       */
  /* ------------------------------------ */

  /**
   * Force reset all cooldowns (useful for debugging/testing)
   */
  resetCooldowns() {
    this.meleeCooldown = 0;
    this.rangedCooldown = 0;
  }

  /**
   * Check if enemy can attack
   */
  canAttack() {
    const dist = Phaser.Math.Distance.Between(
      this.enemy.sprite.x,
      this.enemy.sprite.y,
      this.player.sprite.x,
      this.player.sprite.y
    );

    const meleeReady = dist <= this.meleeRange && this.meleeCooldown <= 0;
    const rangedReady = dist > this.meleeRange && 
                        dist <= this.rangedRange && 
                        this.rangedCooldown <= 0;

    return meleeReady || rangedReady;
  }

  /**
   * Get current attack status (for debugging)
   */
  getStatus() {
    return {
      meleeCooldown: this.meleeCooldown.toFixed(0),
      rangedCooldown: this.rangedCooldown.toFixed(0),
      canAttack: this.canAttack()
    };
  }
}