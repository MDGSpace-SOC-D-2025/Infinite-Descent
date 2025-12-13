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
    /**
     * TEMPORARY VISUAL:
     * Green block
     * Replace with sprite later
     */
    this.sprite = scene.add.rectangle(
      tileX * tileSize + tileSize / 2,
      tileY * tileSize + tileSize / 2,
      tileSize - 4,
      tileSize - 4,
      0x00ff00
    );

  }
}
