/**
 * Spawn Utilities
 * ----------------
 * Responsible ONLY for finding valid spawn locations
 * Does NOT know about Phaser, sprites, or entities
 */

/**
 * Returns a random floor tile from a dungeon grid
 * grid[y][x] === 0 → floor
 */
export function getRandomFloorTile(grid) {
  const floorTiles = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 0) {
        floorTiles.push({ x, y });
      }
    }
  }

  if (floorTiles.length === 0) {
    throw new Error("No floor tiles available for spawning");
  }

  return floorTiles[Math.floor(Math.random() * floorTiles.length)];
}
