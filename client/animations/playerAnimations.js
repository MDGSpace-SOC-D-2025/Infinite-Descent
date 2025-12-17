/**
 * Register all player animations (directional)
 * Call this ONCE from GameScene.create()
 */
export function createPlayerAnimations(scene) {
  // Prevent duplicate creation on scene restart
  if (scene.anims.exists("player-walk-down")) return;

  // --- WALK DOWN ---
  scene.anims.create({
    key: "player-walk-down",
    frames: scene.anims.generateFrameNumbers("player", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // --- WALK LEFT ---
  scene.anims.create({
    key: "player-walk-left",
    frames: scene.anims.generateFrameNumbers("player", {
      start: 4,
      end: 7,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // --- WALK RIGHT ---
  scene.anims.create({
    key: "player-walk-right",
    frames: scene.anims.generateFrameNumbers("player", {
      start: 8,
      end: 11,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // --- WALK UP ---
  scene.anims.create({
    key: "player-walk-up",
    frames: scene.anims.generateFrameNumbers("player", {
      start: 12,
      end: 15,
    }),
    frameRate: 10,
    repeat: -1,
  });

  // --- IDLE DOWN ---
  scene.anims.create({
    key: "player-idle-down",
    frames: [{ key: "player", frame: 0 }],
    frameRate: 1,
  });

  // --- IDLE LEFT ---
  scene.anims.create({
    key: "player-idle-left",
    frames: [{ key: "player", frame: 4 }],
    frameRate: 1,
  });

  // --- IDLE RIGHT ---
  scene.anims.create({
    key: "player-idle-right",
    frames: [{ key: "player", frame: 8 }],
    frameRate: 1,
  });

  // --- IDLE UP ---
  scene.anims.create({
    key: "player-idle-up",
    frames: [{ key: "player", frame: 12 }],
    frameRate: 1,
  });
}
