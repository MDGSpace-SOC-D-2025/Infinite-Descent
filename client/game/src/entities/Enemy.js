/**
 * Enemy Entity
 * ------------
 * Same structure as Player
 * AI will be added later
 */

export default class Enemy {
  constructor(scene,tileX,tileY,tileSize){

  this.tx=tileX;
  this.ty=tileY;
  this.hp=40;

  const x=tileX*tileSize+tileSize/2;
  const y=tileY*tileSize+tileSize/2;

  this.sprite=scene.add.sprite(x,y,"enemy");
  this.sprite.setOrigin(0.5,1)

  this.sprite.setScale(1.5);
  this.sprite.setDepth(10);
  this.facing="down";

  }

  takeDamage(amount){
    if(this.dead)
      return;

    this.hp-=amount;
    console.log("enemy Hp",this.hp);

    this.sprite.setFillStyle(0xffffff);
    this.scene.time.delayedcall(60,()=>{
      if(this.sprite) this.sprite.setFillStyle(0xff444400);
    });

    if(this.hp<=0){
      this.die();
    }
  }
  die(){
    this.dead=true;

    this.scene.tweens.add({
      targets:this.sprite,
      alpha:0,
      duration:200,
      onComplete:()=>{
        this.sprite.destroy();
      }
    });
  }
}
