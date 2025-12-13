import Phaser from "phaser";

export default class PlayerMovement {
    constructor(scene, player, grid, mapWidth, mapHeight, tileSize,speed=120) {
        this.scene = scene;
        this.player = player;
        this.grid = grid;
        this.mapHeight = mapHeight;
        this.mapWidth = mapWidth;
        this.tileSize = tileSize;
        this.speed=speed;
        this.keys = scene.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D",
        });
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update(delta) {
        let vx = 0;
        let vy = 0;

        // Check WASD keys
        if (this.keys.left.isDown) vx -= 1;
        if (this.keys.right.isDown) vx += 1;
        if (this.keys.up.isDown) vy -= 1;
        if (this.keys.down.isDown) vy += 1;
       

        if (vx === 0 && vy === 0) return ;

        const len=Math.hypot(vx,vy);
        vx/=len;
        vy/=len;

        const moveX=vx*this.speed*(delta/1000);
        const moveY=vy*this.speed*(delta/1000)

        this.tryMove(moveX,moveY);
    }

    tryMove(dx, dy) {
        const nextX = this.player.sprite.x + dx;
        const nextY = this.player.sprite.y + dy;

    const tileX=Math.floor(nextX/this.tileSize);
    const tileY=Math.floor(nextY/this.tileSize);

    if(
        tileX<0||
        tileY<0||
        tileY>=this.grid.length||
        tileX>=this.grid[0].length
    ) return;


        // Check walls
    if (this.grid[tileY][tileX] === 1) return;

        // Move player
    this.player.sprite.x=nextX;
    this.player.sprite.y=nextY    
    }
}