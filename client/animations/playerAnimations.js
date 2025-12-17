/**
 * Player Animations
 * -----------------
 * Creates all player animation definitions
 * Call this ONCE in GameScene.create()
 */

export function createPlayerAnimations(scene) {
  // Check if animations already exist
  if (scene.anims.exists('player-idle-down')) {
    return;
  }

  // IDLE ANIMATIONS
  scene.anims.create({
    key: 'player-idle-down',
    frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: 'player-idle-up',
    frames: scene.anims.generateFrameNumbers('player', { start: 12, end: 12 }),
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: 'player-idle-left',
    frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: 'player-idle-right',
    frames: scene.anims.generateFrameNumbers('player', { start: 8, end: 8 }),
    frameRate: 1,
    repeat: -1
  });

  // WALK ANIMATIONS
  scene.anims.create({
    key: 'player-walk-down',
    frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1
  });

  scene.anims.create({
    key: 'player-walk-up',
    frames: scene.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
    frameRate: 8,
    repeat: -1
  });

  scene.anims.create({
    key: 'player-walk-left',
    frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
    frameRate: 8,
    repeat: -1
  });

  scene.anims.create({
    key: 'player-walk-right',
    frames: scene.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
    frameRate: 8,
    repeat: -1
  });

  console.log('Player animations created');
}