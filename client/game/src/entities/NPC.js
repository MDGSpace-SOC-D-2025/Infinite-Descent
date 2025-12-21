
export default class NPC {
  constructor(scene, tileX, tileY, tileSize) {
    this.tx=tileX;
    this.ty=tileY;

    const x=tileX*tileSize+tileSize/2;
    const y=tileY*tileSize+tileSize/2;

    this.sprite=scene.add.sprite(x,y,"npc");
    this.sprite.setOrigin(0.5,0.5);

    this.sprite.setScale(1.5);
    this.sprite.setDepth(10);
    this.facing="down"
  }
}
