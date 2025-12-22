import Phaser from "phaser";

export default function handleMagicAttack(
  scene,
  player,
  enemies,
  tileSize
) {
  const maxRange = 8 * tileSize;
  const bulletSpeed = 420;

  let closestEnemy = null;
  let minDist = Infinity;

  for (const enemy of enemies) {
    if (!enemy || enemy.dead || !enemy.sprite) continue;

    const d = Phaser.Math.Distance.Between(
      player.sprite.x,
      player.sprite.y,
      enemy.sprite.x,
      enemy.sprite.y
    );

    if (d < minDist) {
      minDist = d;
      closestEnemy = enemy;
    }
  }

  /* ------------------------------------ */
  /* Determine shooting angle             */
  /* ------------------------------------ */
  
  let baseAngle;
  let spread = 0;

  if (closestEnemy && minDist <= maxRange) {
    // Enemy in range - aim at enemy with spread
    const distanceRatio = minDist / maxRange;
    spread = Phaser.Math.Linear(0, 0.6, distanceRatio);

    baseAngle = Phaser.Math.Angle.Between(
      player.sprite.x,
      player.sprite.y,
      closestEnemy.sprite.x,
      closestEnemy.sprite.y
    );
  } else {
    // No enemy in range - shoot in facing direction
    const angleMap = {
      'down': Math.PI / 2,      // 90 degrees
      'up': -Math.PI / 2,       // -90 degrees
      'left': Math.PI,          // 180 degrees
      'right': 0                // 0 degrees
    };
    baseAngle = angleMap[player.facing] || 0;
    spread = 0.2; // Small spread for manual shots
    closestEnemy = null; // No target
  }

  const finalAngle = baseAngle + Phaser.Math.FloatBetween(-spread, spread);

  /* ------------------------------------ */
  /* Create MAGIC BULLET                  */
  /* ------------------------------------ */

  const bullet = scene.add.circle(
    player.sprite.x,
    player.sprite.y,
    6,
    0x66ccff
  );
  bullet.setDepth(15);

  // Enable physics on bullet
  scene.physics.add.existing(bullet);
  bullet.body.setCircle(6);
  
  // Set velocity based on angle
  bullet.body.setVelocity(
    Math.cos(finalAngle) * bulletSpeed,
    Math.sin(finalAngle) * bulletSpeed
  );

  // Add glow effect
  const glow = scene.add.circle(
    player.sprite.x,
    player.sprite.y,
    10,
    0x66ccff,
    0.3
  );
  glow.setDepth(14);

  /* ------------------------------------ */
  /* Update glow position with bullet     */
  /* ------------------------------------ */
  scene.events.on('update', function updateGlow() {
    if (bullet.active) {
      glow.x = bullet.x;
      glow.y = bullet.y;
    } else {
      glow.destroy();
      scene.events.off('update', updateGlow);
    }
  });

  /* ------------------------------------ */
  /* Hit detection (manual check)         */
  /* ------------------------------------ */
  let hasHit = false;
  
  const checkHit = () => {
    if (hasHit || !bullet.active || !closestEnemy || closestEnemy.dead) return;
    
    const dist = Phaser.Math.Distance.Between(
      bullet.x,
      bullet.y,
      closestEnemy.sprite.x,
      closestEnemy.sprite.y
    );
    
    if (dist < 30) { // Hit radius
      hasHit = true;
      closestEnemy.takeDamage(15);
      
      // Hit effect
      scene.add.circle(bullet.x, bullet.y, 20, 0xffffff, 0.8)
        .setDepth(20);
      
      scene.tweens.add({
        targets: scene.add.circle(bullet.x, bullet.y, 20, 0x66ccff, 0.5).setDepth(19),
        scale: 2,
        alpha: 0,
        duration: 200,
        onComplete: (tween) => {
          tween.targets[0].destroy();
        }
      });
      
      bullet.destroy();
      glow.destroy();
    }
  };

  scene.events.on('update', checkHit);

  /* ------------------------------------ */
  /* Auto-destroy if missed               */
  /* ------------------------------------ */

  scene.time.delayedCall(1200, () => {
    if (bullet && bullet.active) {
      bullet.destroy();
      glow.destroy();
      scene.events.off('update', checkHit);
    }
  });

  console.log("Magic bullet fired at angle:", finalAngle);
}