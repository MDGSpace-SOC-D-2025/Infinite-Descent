import Phaser from "phaser";

/**
 * Enemy Melee Attack
 * ------------------
 * Close-range physical attack
 * - Red claw slash animation
 * - Knockback effect
 * - High damage
 */

export default function performMeleeAttack(scene, enemy, player, damage = 10) {
  console.log("Enemy melee attack!");

  // Calculate angle to player
  const angle = Phaser.Math.Angle.Between(
    enemy.sprite.x,
    enemy.sprite.y,
    player.sprite.x,
    player.sprite.y
  );

  const slashX = enemy.sprite.x + Math.cos(angle) * 30;
  const slashY = enemy.sprite.y + Math.sin(angle) * 30;

  /* ------------------------------------ */
  /* Red Claw Slash Visual                */
  /* ------------------------------------ */

  const slash = scene.add.graphics();
  slash.setDepth(20);
  slash.lineStyle(4, 0xff0000, 1);
  slash.beginPath();
  slash.arc(
    slashX,
    slashY,
    25,
    angle - 0.5,
    angle + 0.5,
    false
  );
  slash.strokePath();

  // Slash animation
  scene.tweens.add({
    targets: slash,
    alpha: 0,
    scaleX: 1.3,
    scaleY: 1.3,
    duration: 200,
    onComplete: () => slash.destroy()
  });

  /* ------------------------------------ */
  /* Blood Particles Effect               */
  /* ------------------------------------ */

  for (let i = 0; i < 6; i++) {
    const particle = scene.add.circle(
      slashX + Phaser.Math.Between(-10, 10),
      slashY + Phaser.Math.Between(-10, 10),
      2,
      0xff0000
    );
    particle.setDepth(19);

    scene.tweens.add({
      targets: particle,
      x: particle.x + Phaser.Math.Between(-20, 20),
      y: particle.y + Phaser.Math.Between(-20, 20),
      alpha: 0,
      duration: 300,
      onComplete: () => particle.destroy()
    });
  }

  /* ------------------------------------ */
  /* Damage Player                        */
  /* ------------------------------------ */

  if (player.takeDamage) {
    player.takeDamage(damage);
  }

  /* ------------------------------------ */
  /* Knockback Effect                     */
  /* ------------------------------------ */

  const knockbackDist = 15;
  scene.tweens.add({
    targets: player.sprite,
    x: player.sprite.x + Math.cos(angle) * knockbackDist,
    y: player.sprite.y + Math.sin(angle) * knockbackDist,
    duration: 150,
    ease: 'Quad.easeOut'
  });

  /* ------------------------------------ */
  /* Red Flash on Player                  */
  /* ------------------------------------ */

  player.sprite.setTint(0xff0000);
  scene.time.delayedCall(100, () => {
    if (player.sprite && !player.dead) {
      player.sprite.clearTint();
    }
  });

  /* ------------------------------------ */
  /* Camera Shake                         */
  /* ------------------------------------ */

  scene.cameras.main.shake(80, 0.002);
}