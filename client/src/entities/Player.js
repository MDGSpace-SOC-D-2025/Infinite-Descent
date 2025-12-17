/**
 * Player Entity
 * -------------
 * Responsible for:
 * - creating the player object
 * - storing tile position
 *
 * Does NOT:
 * - handle input
 * - handle movement logic
 * - manage turns
 */

export default class Player {
  constructor(scene, tileX, tileY, tileSize) {
    // this.sprite = scene.add.rectangle(
    //   tileX * tileSize + tileSize / 2,
    //   tileY * tileSize + tileSize / 2,
    //   tileSize - 4,
    //   tileSize - 4,
    //   0x00ff00
    // );
    this.tx=tileX;
    this.ty=tileY

    const x=tileX*tileSize+tileSize/2;
    const y=tileY*tileSize+tileSize/2;

    this.sprite=scene.add.sprite(x,y,"player");

    this.sprite.setScale(1.5);
    this.sprite.setDepth(10);
    this.facing="down";

  }
}
