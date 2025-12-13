import BootScene from "./scenes/BootScene.js";
import GameScene from "./scenes/GameScene.js";
import Phaser, { Scale } from "phaser";

export default {
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: "#0b0b0b",
    Scale:{
        mode:Phaser.Scale.RESIZE,
        autoCenter:Phaser.Scale.CENTER_BOTH,
        width:1280,
        height:720,
    },
    scene: [BootScene, GameScene],
}