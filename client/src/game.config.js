import BootScene from "./scenes/BootScene.js";
import GameScene from "./scenes/GameScene.js";
import Phaser from "phaser";

export default {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: "game",
    backgroundColor: "#0b0b0b",
    scene: [BootScene, GameScene],
}