/**
 * Enemy Entity
 * ------------
 * Same structure as Player
 * AI will be added later
 */

export default class Enemy {
  constructor(scene, tileX, tileY, tileSize) {
    this.sprite = scene.add.rectangle(
      tileX * tileSize + tileSize / 2,
      tileY * tileSize + tileSize / 2,
      tileSize - 4,
      tileSize - 4,
      0xff0000
    );

   
  }
}
