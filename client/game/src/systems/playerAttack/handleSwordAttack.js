import Phaser from "phaser";

export default function handleSwordAttack(scene,player,enemies,tileSize){
    const range=2*tileSize;
    for(const enemy of enemies){
        if(!enemy||enemy.dead) continue;
        const dist=Phaser.Math.Distance.Between(
            player.sprite.x,
            player.sprite.y,
            enemy.sprite.x,
            enemy.sprite.y
        );
        if(dist<=range){
            enemy.takeDamage(25);
        }

        scene.tweens.add({
            targets:enemy.sprite,
            x:enemy.sprite.x +Phaser.Math.Between(-12,12),
            y:enemy.sprite.y+Phaser.Math.Between(-12,12),
            duration:80,

        });
    }
}