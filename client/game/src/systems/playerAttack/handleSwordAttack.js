import Phaser from "phaser";

export default function handleSwordAttack(scene, player, enemies, tileSize) {
  const range = 2 * tileSize;
  
  // Create sword slash visual effect
  const slashAngle = {
    'down': 90,
    'up': -90,
    'left': 180,
    'right': 0
  }[player.facing] || 0;

  // Sword slash arc
  const slashGraphics = scene.add.graphics();
  slashGraphics.setDepth(20);
  
  // Position based on facing
  let offsetX = 0;
  let offsetY = 0;
  
  switch(player.facing) {
    case 'down':
      offsetX = 0;
      offsetY = 40;
      break;
    case 'up':
      offsetX = 0;
      offsetY = -40;
      break;
    case 'left':
      offsetX = -40;
      offsetY = 0;
      break;
    case 'right':
      offsetX = 40;
      offsetY = 0;
      break;
  }

  const slashX = player.sprite.x + offsetX;
  const slashY = player.sprite.y + offsetY;

  // Draw sword slash arc
  slashGraphics.lineStyle(4, 0xffffff, 1);
  slashGraphics.beginPath();
  slashGraphics.arc(
    slashX,
    slashY,
    30,
    Phaser.Math.DegToRad(slashAngle - 45),
    Phaser.Math.DegToRad(slashAngle + 45),
    false
  );
  slashGraphics.strokePath();

  // Animate slash
  scene.tweens.add({
    targets: slashGraphics,
    alpha: 0,
    scaleX: 1.5,
    scaleY: 1.5,
    duration: 150,
    onComplete: () => {
      slashGraphics.destroy();
    }
  });

  // Add impact particles
  const particles = [];
  for (let i = 0; i < 5; i++) {
    const particle = scene.add.circle(
      slashX + Phaser.Math.Between(-20, 20),
      slashY + Phaser.Math.Between(-20, 20),
      3,
      0xffffff
    );
    particle.setDepth(19);
    particles.push(particle);
    
    scene.tweens.add({
      targets: particle,
      x: particle.x + Phaser.Math.Between(-30, 30),
      y: particle.y + Phaser.Math.Between(-30, 30),
      alpha: 0,
      duration: 200,
      onComplete: () => {
        particle.destroy();
      }
    });
  }

  // Check for enemy hits
  for (const enemy of enemies) {
    if (!enemy || enemy.dead || !enemy.sprite) continue;
    
    const dist = Phaser.Math.Distance.Between(
      player.sprite.x,
      player.sprite.y,
      enemy.sprite.x,
      enemy.sprite.y
    );
    
    if (dist <= range) {
      enemy.takeDamage(25);
      
      // Knockback effect
      const angle = Phaser.Math.Angle.Between(
        player.sprite.x,
        player.sprite.y,
        enemy.sprite.x,
        enemy.sprite.y
      );
      
      const knockbackDist = 20;
      scene.tweens.add({
        targets: enemy.sprite,
        x: enemy.sprite.x + Math.cos(angle) * knockbackDist,
        y: enemy.sprite.y + Math.sin(angle) * knockbackDist,
        duration: 100,
        yoyo: true,
        ease: 'Quad.easeOut'
      });

      // Hit flash
      enemy.sprite.setTint(0xff0000);
      scene.time.delayedCall(100, () => {
        if (enemy.sprite && !enemy.dead) {
          enemy.sprite.clearTint();
        }
      });
      
      console.log("Sword hit enemy!");
    }
  }

  // Camera shake on attack
  scene.cameras.main.shake(100, 0.002);
}