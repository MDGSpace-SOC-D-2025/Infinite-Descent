
import BootScene from "./scenes/BootScene.js";
import GameScene from "./scenes/GameScene.js";

export default{
    type:Phaser.AUTO,
    with:1000,
    heiht:600,
    parent:"game",
    backgroundColor:"#0b0b0b",
    Scene:[BootScene,GameScene],
}