/**
 * NPC Animations
 * --------------
 * Creates all NPC animation definitions
 * Call this ONCE in GameScene.create()
 */

export function createNPCAnimations(scene) {
  // Check if animations already exist
  if (scene.anims.exists('npc-idle-down')) {
    return;
  }

  // IDLE ANIMATIONS
  scene.anims.create({
    key: 'npc-idle-down',
    frames: scene.anims.generateFrameNumbers('npc', { start: 0, end: 0 }),
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: 'npc-idle-up',
    frames: scene.anims.generateFrameNumbers('npc', { start: 12, end: 12 }),
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: 'npc-idle-left',
    frames: scene.anims.generateFrameNumbers('npc', { start: 4, end: 4 }),
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: 'npc-idle-right',
    frames: scene.anims.generateFrameNumbers('npc', { start: 8, end: 8 }),
    frameRate: 1,
    repeat: -1
  });

  console.log('NPC animations created');
}