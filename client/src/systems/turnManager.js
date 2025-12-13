export default class TurnManager{
    constructor(){
        this.units=[];
        this.index=0;

    }
    setUnits(units){
        this.units=units;
        this.index=0;
    }
    next(){
        const unit=this.units[this.index];
        this.index=(this.index+1)%this.units.length;
        return unit;

    }
}