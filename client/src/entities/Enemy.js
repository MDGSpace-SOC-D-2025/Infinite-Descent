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

  const x=tileX*tileSize+tileSize/2;
  const y=tileY*tileSize+tileSize/2;

  this.sprite=scene.add.sprite(x,y,"enemy");
  this.sprite.setOrigin(0.5,1)

  this.sprite.setScale(1.5);
  this.sprite.setDepth(10);
  this.facing="down";

  }
}
