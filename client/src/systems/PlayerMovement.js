import Phaser from "phaser";

export default class PlayerMovement{
    constructor(
        scene,
        player,
        grid,
        mapWidth,
        mapHeight,
        tileSize
    ){
        this.scene=scene;
        this.player=player;
        this.grid=grid;
        this.mapHeight=mapHeight;
        this.mapWidth=mapWidth;
        this.tileSize=tileSize;
        this.keys=scene.input.keyboard.addKeys({
            up:"W",
            down:"S",
            left:"A",
            right:"D",
        })
        this.cursors=scene.input.keyboard.createCursorKeys();
    }
    update(){
        let dx=0;
        let dy=0;

        if (Phaser.Input.keyboard.JustDown(this.keys.left)) dx=-1;
        else if(Phaser.Input.keyboard.JustDown(this.keys.right)) dx=1;
        else if(Phaser.Input.keyboard.JustDown(this.keys.up)) dy=-1;
        else if(Phaser.Input.keyboard.JustDown(this.keys.down)) dy=1;

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) dx = -1;
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) dx = 1;
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) dy = -1;
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) dy = 1;
        
        if(dx===0 && dy===0) return false;

        return this.tryMove(dx,dy);
    }
    tryMove(dx,dy){
        const nx=this.player.tx +dx;
        const ny=this.player.ty +dy;

        if(nx <0 || ny<0 || nx>=this.mapWidth||ny>=this.mapHeight){
        return false;
    }
    if(this.grid[ny][nx]===1){
        return false;
    }
    this.player.tx=nx;
    this.player.ty=ny;
    this.player.x=nx*this.tileSize+this.tileSize/2;
    this.player.y=ny*this.tileSize+this.tileSize/2;
    return true;
    }
    
}   

