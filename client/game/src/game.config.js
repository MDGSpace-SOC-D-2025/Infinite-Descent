import BootScene from "./scenes/BootScene.js";
import GameScene from "./scenes/GameScene.js";
import Phaser, { Physics, Scale } from "phaser";
import PreloadScene from "./scenes/PreloadScene.js";

export default {
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: "#0b0b0b",
    Physics:{
        default:"arcade",
        arcade:{
            debug:false
        }

    },
    scale:{
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH,
        width:1280,
        height:720,
    },
    scene: [PreloadScene,BootScene ,GameScene,],
}