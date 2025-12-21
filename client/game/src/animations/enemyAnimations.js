/**
 * Enemy Animations
 * ----------------
 * Creates all enemy animation definitions
 * Call this ONCE in GameScene.create()
 * 
 * Spritesheet layout (60x60 frames):
 * Row 0 (frames 0-5): Walk Down
 * Row 1 (frames 6-11): Walk Left
 * Row 2 (frames 12-17): Walk Right
 * Row 3 (frames 18-23): Walk Up
 */

export function createEnemyAnimations(scene) {
  if (scene.anims.exists("enemy-idle-down")) return;

  /* ---------------- IDLE ---------------- */
  scene.anims.create({
    key: "enemy-idle-down",
    frames: [{ key: "enemy", frame: 0 }],
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-idle-left",
    frames: [{ key: "enemy", frame: 6 }],
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-idle-right",
    frames: [{ key: "enemy", frame: 12 }],
    frameRate: 1,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-idle-up",
    frames: [{ key: "enemy", frame: 18 }],
    frameRate: 1,
    repeat: -1
  });

  /* ---------------- WALK ---------------- */
  scene.anims.create({
    key: "enemy-walk-down",
    frames: scene.anims.generateFrameNumbers("enemy", {
      start: 0,
      end: 5
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-walk-left",
    frames: scene.anims.generateFrameNumbers("enemy", {
      start: 6,
      end: 11
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-walk-right",
    frames: scene.anims.generateFrameNumbers("enemy", {
      start: 12,
      end: 17
    }),
    frameRate: 10,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-walk-up",
    frames: scene.anims.generateFrameNumbers("enemy", {
      start: 18,
      end: 23
    }),
    frameRate: 10,
    repeat: -1
  });

  console.log('✅ Enemy animations created');
}