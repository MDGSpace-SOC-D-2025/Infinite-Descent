import Phaser from "phaser";

/**
 * Enemy Ranged Attack
 * -------------------
 * Long-range magic projectile
 * - Red/dark magic orb
 * - Homing behavior
 * - Medium damage
 */

export default function performRangedAttack(scene, enemy, player, damage = 5) {
  console.log("Enemy ranged attack!");

  // Calculate angle to player
  const angle = Phaser.Math.Angle.Between(
    enemy.sprite.x,
    enemy.sprite.y,
    player.sprite.x,
    player.sprite.y
  );

  /* ------------------------------------ */
  /* Create Dark Magic Projectile        */
  /* ------------------------------------ */

  const projectile = scene.add.circle(
    enemy.sprite.x,
    enemy.sprite.y,
    5,
    0xff4444 // Dark red
  );
  projectile.setDepth(15);

  // Enable physics
  scene.physics.add.existing(projectile);
  projectile.body.setCircle(5);

  const speed = 300;
  projectile.body.setVelocity(
    Math.cos(angle) * speed,
    Math.sin(angle) * speed
  );

  /* ------------------------------------ */
  /* Dark Glow Effect                     */
  /* ------------------------------------ */

  const glow = scene.add.circle(
    enemy.sprite.x,
    enemy.sprite.y,
    12,
    0xff0000,
    0.4
  );
  glow.setDepth(14);

  // Pulsing glow animation
  scene.tweens.add({
    targets: glow,
    scale: 1.2,
    alpha: 0.6,
    duration: 300,
    yoyo: true,
    repeat: -1
  });

  /* ------------------------------------ */
  /* Update Glow Position                 */
  /* ------------------------------------ */

  const updateGlow = () => {
    if (projectile.active) {
      glow.x = projectile.x;
      glow.y = projectile.y;
    } else {
      glow.destroy();
      scene.events.off('update', updateGlow);
    }
  };
  scene.events.on('update', updateGlow);

  /* ------------------------------------ */
  /* Trail Effect                         */
  /* ------------------------------------ */

  const trailTimer = scene.time.addEvent({
    delay: 50,
    callback: () => {
      if (projectile.active) {
        const trail = scene.add.circle(
          projectile.x,
          projectile.y,
          3,
          0xff0000,
          0.6
        );
        trail.setDepth(13);

        scene.tweens.add({
          targets: trail,
          alpha: 0,
          scale: 0.5,
          duration: 200,
          onComplete: () => trail.destroy()
        });
      }
    },
    loop: true
  });

  /* ------------------------------------ */
  /* Hit Detection                        */
  /* ------------------------------------ */

  let hasHit = false;

  const checkHit = () => {
    if (hasHit || !projectile.active || !player || player.dead) return;

    const dist = Phaser.Math.Distance.Between(
      projectile.x,
      projectile.y,
      player.sprite.x,
      player.sprite.y
    );

    if (dist < 25) {
      hasHit = true;
      trailTimer.remove();

      // Damage player
      if (player.takeDamage) {
        player.takeDamage(damage);
      }

      /* -------------------------------- */
      /* Hit Explosion Effect             */
      /* -------------------------------- */

      // Center explosion
      const explosion = scene.add.circle(
        projectile.x,
        projectile.y,
        15,
        0xff0000,
        0.8
      );
      explosion.setDepth(20);

      scene.tweens.add({
        targets: explosion,
        scale: 2,
        alpha: 0,
        duration: 200,
        onComplete: () => explosion.destroy()
      });

      // Explosion particles
      for (let i = 0; i < 8; i++) {
        const angleOffset = (Math.PI * 2 * i) / 8;
        const particle = scene.add.circle(
          projectile.x,
          projectile.y,
          3,
          0xff4444
        );
        particle.setDepth(19);

        scene.tweens.add({
          targets: particle,
          x: projectile.x + Math.cos(angleOffset) * 30,
          y: projectile.y + Math.sin(angleOffset) * 30,
          alpha: 0,
          duration: 300,
          onComplete: () => particle.destroy()
        });
      }

      // Destroy projectile
      projectile.destroy();
      glow.destroy();
      scene.events.off('update', checkHit);
    }
  };

  scene.events.on('update', checkHit);

  /* ------------------------------------ */
  /* Auto-destroy After 2 Seconds         */
  /* ------------------------------------ */

  scene.time.delayedCall(2000, () => {
    if (projectile && projectile.active) {
      projectile.destroy();
      glow.destroy();
      trailTimer.remove();
      scene.events.off('update', checkHit);
    }
  });
}