export function createEnemyAnimations(scene){
    if(scene.anims.exists("enemy-idle-down")){
        return;
    }

    scene.anime.create({
        key:"enemy-idle-down",
        frames:scene.anims.generateFrameNumbers('enemy',{start:0,end:0}),
        frameRate:1,
        repeat:-1
    });

    scene.anims.create({
        key:'enemy-idle-up',
        frames:scene.generateFrameNumbers('enemy',{start:12,end:12}),
        frameRate:1,
        repeat:-1
    });

    scene.anims.create({
        key:'enemy-idle-left',
        frames:scene.generateFrameNumbers('enemy',{start:4,end:4}),
        frameRate:1,
        repeat:-1
    });

    scene.anims.create({
        key:'enemy-idle-right',
        frames:scene.generateFrameNumbers('enemy',{start:8,end:8}),
        frameRate:1,
        repeat:-1
    });

    scene.anims.create({
        key:'enemy-walk-down',
        frames:scene.generateFrameNumbers('enemy',{start:0,end:3}),
        frameRate:8,
        repeat:-1
    });

    scene.anims.create({
        key:'enemy-walk-up',
        frames:scene.generateFrameNumbers('enemy',{start:12,end:15}),
        frameRate:8,
        repeat:-1
    });

    scene.anims.create({
        key:'enemy-walk-left',
        frames:scene.generateFrameNumbers('enemy',{start:4,end:7}),
        frameRate:8,
        repeat:-1
    });

    scene.anims.create({
        key:'enemy-walk-right',
        frames:scene.generateFrameNumbers('enemy',{start:8,end:11}),
        frameRate:8,
        repeat:-1
    });

}