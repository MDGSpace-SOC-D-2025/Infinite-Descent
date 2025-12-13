import Phaser from "phaser";
import { generateDungeon } from "../systems/dungeonGenerator";
import TurnManager from "../systems/turnManager";
import PlayerMovement from "../systems/PlayerMovement";

const TILE=32;


export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");

    }
    create(){
        this.mapW=30;
        this.mapH=20;
        this.grid=generateDungeon(this.mapW,this.mapH);

        for(let y=0; y<this.mapH; y++){
            for(let x=0;x<this.add.mapW;x++){
                const color=this.grid[y][x]===0?0x333333 : 0x111111;

                this.add.rectangle(
                    x*TILE,
                    y*TILE,
                    TILE,
                    color
                ).setOrigin(0);
            }
        }
        this.player=this.add.rectangle(
            5*TILE+TILE/2,
            5*TILE+TILE/2,
            TILE-4,
            TILE-4,
            0x00ff00
        );
        this.turns=new TurnManager();
        this.turns.setUnits([this.player,this.enemy]);
        this.activeUnit=this.turns.next();

        this.PlayerMovement=new PlayerMovement(
            this,
            this.player,
            this.grid,
            this.mapH,
            this.mapW,
            TILE
        );
        update(){
            if(this.activeUnit!==this.player) return;
            const moved=this.PlayerMovement.update();
            if(moved){
                this.activeUnit=this.turns.next();
            }
        }
    }
    

}