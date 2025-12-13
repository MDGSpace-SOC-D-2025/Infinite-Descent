/**
 * Generates a dungeon grid
 * 0 = floor
 * 1 = wall
 */

export function generateDungeon(width, height) {
  const grid = Array.from({ length: height }, () =>
    Array(width).fill(1)
  );

  // Random rooms
  for (let i = 0; i < 8; i++) {
    const rw = 5 + Math.floor(Math.random() * 6);
    const rh = 5 + Math.floor(Math.random() * 6);
    const rx = Math.floor(Math.random() * (width - rw - 1));
    const ry = Math.floor(Math.random() * (height - rh - 1));

    for (let y = ry; y < ry + rh; y++) {
      for (let x = rx; x < rx + rw; x++) {
        grid[y][x] = 0;
      }
    }
  }

  return grid;
}
