export default class chatUI{
  constructor(scene){
    this.scene=scene;
    this.isopen=false;


    this.container = document.createElement("div");
    this.container.style.position = "fixed";
    this.container.style.bottom = "20px";
    this.container.style.left = "50%";
    this.container.style.transform = "translateX(-50%)";
    this.container.style.width = "400px";
    this.container.style.background = "#111";
    this.container.style.border = "2px solid #444";
    this.container.style.padding = "10px";
    this.container.style.display = "none";

    this.log=document.createElement("div");
     this.log.style.height = "120px";
    this.log.style.overflowY = "auto";
    this.log.style.color = "white";

    this.input = document.createElement("input");
    this.input.style.width = "100%";
    this.input.style.marginTop = "8px";

    this.container.appendChild(this.log);
    this.container.appendChild(this.input);
    document.body.appendChild(this.container);

    this.input.addEventListener("keydown",(e)=>{
      if(e.key==="Enter"){
        this.sendMessage();
      }
    });
  }
 
  open(){
    this.isopen=true;
    this.container.style.display="block";
    this.input.focus();
    this.scene.playerMovement.enabled=false;

  }
  close(){
    this.isopen=false;
    this.container.style.display="none";
    this.scene.playerMovement.enabled=true;
  }
  async sendMessage(){
    const message=this.input.value;
    if(!message) return;

    this.log.innerHTML+=`<div>${message}</div>`;
    this.input.value="";

    const res=await fetch("http://localhost:3001/api/npc-chat",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({message}),
    });

    const data=await res.json();
    this.log.innerHTML+=`<div style="color:#6cf">${data.reply}</div>`;
    this.log.scrollTop = this.log.scrollHeight;
  }
}