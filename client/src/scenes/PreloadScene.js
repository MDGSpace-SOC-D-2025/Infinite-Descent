import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    
    this.load.spritesheet("player", "assets/player/player.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    this.load.spritesheet("enemy","assets/enemy/enemy.png",{
        frameWidth:60,
        frameHeight:60,
    });

    this.load.image("dungeinTiles","assets/tilemaps/dungeon.png");


  
        
    
  }

  create() {
    console.log(
    " texture",
    this.textures.exists("player")
    );

    
    this.scene.start("GameScene");
    console.log("starting gamescene")
}
  }

  
