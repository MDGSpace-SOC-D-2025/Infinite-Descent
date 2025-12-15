export default class NPC{
    constructor(scene,tileX,tileY,tileSize){
        this.sprite=scene.add.rectangle(
            tileX * tileSize + tileSize / 2,
            tileY * tileSize + tileSize / 2,
            tileSize - 4,
            tileSize - 4,
            0x00aaff // BLUE NPC

        );
        this.tileX=tileX,
        this.tileY=tileY
    }
     isNear(player, maxDistance = 1) {
    const px = Math.floor(player.sprite.x / 32);
    const py = Math.floor(player.sprite.y / 32);

    return (
      Math.abs(px - this.tileX) <= maxDistance &&
      Math.abs(py - this.tileY) <= maxDistance
    );
  }
}