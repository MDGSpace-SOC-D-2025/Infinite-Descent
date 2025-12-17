import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    console.log("🔵 PreloadScene preload() running")
    // ✅ Load player sprite sheet
    // Path is RELATIVE TO public/
    this.load.spritesheet("player", "assets/player/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    console.log(
    "🟢 Player texture exists?",
    this.textures.exists("player")
    );
    // ✅ Start the game scene AFTER assets load
    this.scene.start("GameScene");
  }
}
