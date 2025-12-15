import phaser from 'phaser'
export default class NPCInteraction{
    constructor(scene,player,npc,chatUI){
        this.scene=scene;
        this.player=player;
        this.npc=npc;
        this.chatUI=chatUI;

        this.keyT=scene.input.keyboard.addKey("T");
    }
    update(){
        if(this.keyT.isDown && this.npc.isNear(this.player)){
            this.chatUI.open();
        }
    }
}