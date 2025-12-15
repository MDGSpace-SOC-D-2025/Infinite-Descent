export default class NPCInteraction{
    constructor(scene,player,npc,chatUI){
        this.scene=scene;
        this.player=player;
        this.npc=npc;
        this.chatUI=chatUI;

        this.keyT=scene.input.keyboard.addKey("T");

        this.prompt=scene.add.text(0,0,"press T to talk",{
            fontsize:"14px",
            color: "#ffffff",
            backgroundColor: "#000000",
            padding: { x: 6, y: 4 },
        });
        this.prompt.setVisible(false);
        this.prompt.setDepth(100);
    }
    update(){
        const dist=Phaser.Math.Distance.Between(
            this.player.sprite.x,
            this.player.sprite.y,
            this.npc.sprite.x,
            this.npc.sprite.y,
  
        );
        if(dist<48&& !this.chatUI.isOpen){
            this.prompt.setVisible(true);
            this.prompt.setPosition(
                this.npc.sprite.x - 30,
                this.npc.sprite.y - 40   
            );
            if(Phaser.Input.Keyboard.JustDown(this.keyT)){
                this.chatUI.open();
            }else{
                this.prompt.setVisible(false);
            }
        }
    }
}