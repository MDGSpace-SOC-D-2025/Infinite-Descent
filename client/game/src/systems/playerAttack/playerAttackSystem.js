import Phaser from "phaser";
import handleSwordAttack from "./handleSwordAttack.js";
import handleMagicAttack from "./handleMagicAttack.js";

export default class PlayerAttackSystem {
  constructor(scene, player, enemies, tileSize) {
    this.scene = scene;
    this.player = player;
    this.enemies = enemies; // array
    this.tileSize = tileSize;

    // INPUT
    this.swordKey = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.P
    );

    this.magicKey = scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // COOLDOWNS (ms)
    this.swordCooldown = 0;
    this.magicCooldown = 0;
  }

  update(delta) {
    this.swordCooldown = Math.max(0, this.swordCooldown - delta);
    this.magicCooldown = Math.max(0, this.magicCooldown - delta);

    if (Phaser.Input.Keyboard.JustDown(this.swordKey)) {
        console.log("p is pressed")
      if (this.swordCooldown <= 0) {
        handleSwordAttack(
          this.scene,
          this.player,
          this.enemies,
          this.tileSize
        );
        this.swordCooldown = 300;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.magicKey)) {
        console.log("space is pressed")
      if (this.magicCooldown <= 0) {
        handleMagicAttack(
          this.scene,
          this.player,
          this.enemies,
          this.tileSize
        );
        this.magicCooldown = 600;
      }
    }
  }
}
