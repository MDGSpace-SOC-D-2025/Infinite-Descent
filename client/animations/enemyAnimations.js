export function createEnemyAnimations(scene) {
  if (scene.anims.exists("enemy-idle-down")) return;

  /* ---------------- IDLE ---------------- */
  scene.anims.create({
    key: "enemy-idle-down",
    frames: [{ key: "enemy", frame: 0 }],
    frameRate: 2,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-idle-left",
    frames: [{ key: "enemy", frame: 6 }],
    frameRate: 2,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-idle-right",
    frames: [{ key: "enemy", frame: 12 }],
    frameRate: 2,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-idle-up",
    frames: [{ key: "enemy", frame: 18 }],
    frameRate: 2,
    repeat: -1
  });

  /* ---------------- WALK ---------------- */
  scene.anims.create({
    key: "enemy-walk-down",
    frames: scene.anims.generateFrameNumbers("enemy", {
      start: 0,
      end: 5
    }),
    frameRate: 12,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-walk-left",
    frames: scene.anims.generateFrameNumbers("enemy", {
      start: 6,
      end: 11
    }),
    frameRate: 12,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-walk-right",
    frames: scene.anims.generateFrameNumbers("enemy", {
      start: 12,
      end: 17
    }),
    frameRate: 12,
    repeat: -1
  });

  scene.anims.create({
    key: "enemy-walk-up",
    frames: scene.anims.generateFrameNumbers("enemy", {
      start: 18,
      end: 23
    }),
    frameRate: 12,
    repeat: -1
  });
}
