import axios from 'axios';

export default class ChatUI {
  constructor(scene) {
    this.scene = scene;
    this.isOpen = false;

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

    // Close button
    this.closeBtn = document.createElement("button");
    this.closeBtn.textContent = "×";
    this.closeBtn.style.position = "absolute";
    this.closeBtn.style.top = "5px";
    this.closeBtn.style.right = "5px";
    this.closeBtn.style.background = "#f44";
    this.closeBtn.style.color = "white";
    this.closeBtn.style.border = "none";
    this.closeBtn.style.width = "25px";
    this.closeBtn.style.height = "25px";
    this.closeBtn.style.borderRadius = "50%";
    this.closeBtn.style.cursor = "pointer";
    this.closeBtn.style.fontSize = "18px";
    this.closeBtn.style.lineHeight = "1";
    this.closeBtn.style.padding = "0";

    this.log = document.createElement("div");
    this.log.style.height = "120px";
    this.log.style.overflowY = "auto";
    this.log.style.color = "white";

    this.input = document.createElement("input");
    this.input.style.width = "100%";
    this.input.style.marginTop = "8px";

    this.container.appendChild(this.closeBtn);
    this.container.appendChild(this.log);
    this.container.appendChild(this.input);
    document.body.appendChild(this.container);

    // Close button click handler
    this.closeBtn.addEventListener("click", () => {
      this.close();
    });

    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.sendMessage();
      } else if (e.key === "Escape") {
        this.close();
      }
    });
  }

  open() {
    this.isOpen = true;
    this.container.style.display = "block";
    this.input.focus();
    this.scene.playerMovement.enabled = false;
  }

  close() {
    this.isOpen = false;
    this.container.style.display = "none";
    this.scene.playerMovement.enabled = true;
  }

  async sendMessage() {
    const message = this.input.value;
    if (!message) return;

    this.log.innerHTML += `<div>${message}</div>`;
    this.input.value = "";

    try {
      // Using axios instead of fetch
      const response = await axios.post("http://localhost:3001/api/npc-chat", {
        message: message
      });

      // axios automatically parses JSON, so response.data contains the data
      this.log.innerHTML += `<div style="color:#6cf">${response.data.reply}</div>`;
      this.log.scrollTop = this.log.scrollHeight;

    } catch (error) {
      console.error("Chat error:", error);
      this.log.innerHTML += `<div style="color:#f66">Error: Could not connect to NPC</div>`;
      this.log.scrollTop = this.log.scrollHeight;
    }
  }
}