/**
 * Player Animations
 * -----------------
 * Creates all player animation definitions
 * Call this ONCE in GameScene.create()
 * 
 * Spritesheet layout (50x50 frames):
 * Row 0 (frames 0-3): Walk Down
 * Row 1 (frames 4-7): Walk Left  
 * Row 2 (frames 8-11): Walk Right
 * Row 3 (frames 12-15): Walk Up
 */

export function createPlayerAnimations(scene) {
  // Check if animations already exist
  if (scene.anims.exists('player-idle-down')) {
    return;
  }

  // IDLE ANIMATIONS (first frame of each walk cycle)
  scene.anims.create({
    key: 'player-idle-down',
    frames: [{ key: 'player', frame: 0 }],
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: 'player-idle-left',
    frames: [{ key: 'player', frame: 4 }],
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: 'player-idle-right',
    frames: [{ key: 'player', frame: 8 }],
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: 'player-idle-up',
    frames: [{ key: 'player', frame: 12 }],
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

  scene.anims.create({
    key: 'player-walk-up',
    frames: scene.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
    frameRate: 8,
    repeat: -1
  });

  console.log('✅ Player animations created');
}