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

  if (!closestEnemy || minDist > maxRange) return;

  /* ------------------------------------ */
  /* Accuracy (Brawl Stars Style)         */
  /* ------------------------------------ */

  const distanceRatio = minDist / maxRange;
  const spread = Phaser.Math.Linear(0, 0.6, distanceRatio);

  const baseAngle = Phaser.Math.Angle.Between(
    player.sprite.x,
    player.sprite.y,
    closestEnemy.sprite.x,
    closestEnemy.sprite.y
  );

  const finalAngle =
    baseAngle + Phaser.Math.FloatBetween(-spread, spread);

  /* ------------------------------------ */
  /* Create MAGIC BULLET                  */
  /* ------------------------------------ */

  const bullet = scene.add.circle(
    player.sprite.x,
    player.sprite.y,
    4,
    0x66ccff
  );

  scene.physics.add.existing(bullet);
  bullet.body.setAllowGravity(false);

  bullet.body.setVelocity(
    Math.cos(finalAngle) * bulletSpeed,
    Math.sin(finalAngle) * bulletSpeed
  );

  /* ------------------------------------ */
  /* Hit detection                        */
  /* ------------------------------------ */

  scene.physics.add.overlap(
    bullet,
    closestEnemy.sprite,
    () => {
      if (closestEnemy.dead) return;

      closestEnemy.takeDamage(15);
      bullet.destroy();
    }
  );

  /* ------------------------------------ */
  /* Auto-destroy if missed               */
  /* ------------------------------------ */

  scene.time.delayedCall(600, () => {
    if (bullet && bullet.active) bullet.destroy();
  });
}
