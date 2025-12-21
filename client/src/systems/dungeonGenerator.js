export function generateDungeon(width, height, biome) {
  const grid = [];

  for (let y = 0; y < height; y++) {
    grid[y] = [];
    for (let x = 0; x < width; x++) {
      // Wall probability influenced by biome
      const isWall = Math.random() < biome.wall.density;
      grid[y][x] = isWall ? 1 : 0;
    }
  }

  return grid;
}
