import Phaser, { Create } from "phaser";
export default class preloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene");
    }
}

preloadScene(){
    this.load.spritesheet("player","assets/player/player.png",{
        frameWidth:32,
        frameHeight:32,
    });
}
Create(){
    this.Scene.start("GameScene");
}