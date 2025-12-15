
export default class NPC {
  constructor(scene, tileX, tileY, tileSize) {
    this.scene = scene;

    
    this.sprite = scene.add.rectangle(
      tileX * tileSize + tileSize / 2,
      tileY * tileSize + tileSize / 2,
      tileSize - 6,
      tileSize - 6,
      0x00aaff 
    );

    this.sprite.setDepth(10);

  
    this.tx = tileX;
    this.ty = tileY;
  }
}
