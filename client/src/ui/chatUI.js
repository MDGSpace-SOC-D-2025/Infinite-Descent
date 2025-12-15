/**
 * Chat UI Overlay
 * ---------------
 * Very simple text-based UI
 * (no HTML yet, Phaser only)
 */

export default class ChatUI {
  constructor(scene) {
    this.scene = scene;
    this.visible = false;

    this.container = scene.add.container(0, 0).setVisible(false);

    const bg = scene.add.rectangle(
      640, 360, 600, 300, 0x000000, 0.9
    );

    this.text = scene.add.text(380, 260, "", {
      color: "#ffffff",
      wordWrap: { width: 500 }
    });

    this.container.add([bg, this.text]);

    // Capture keyboard input
    this.input = "";
    scene.input.keyboard.on("keydown", (e) => {
      if (!this.visible) return;

      if (e.key === "Enter") {
        this.sendMessage();
      } else if (e.key === "Backspace") {
        this.input = this.input.slice(0, -1);
      } else if (e.key.length === 1) {
        this.input += e.key;
      }

      this.updateText();
    });
  }

  open() {
    this.visible = true;
    this.container.setVisible(true);
    this.input = "";
    this.text.setText("NPC: Speak, traveler...\n> ");
  }

  close() {
    this.visible = false;
    this.container.setVisible(false);
  }

  updateText() {
    this.text.setText(`NPC: Speak, traveler...\n> ${this.input}`);
  }

  async sendMessage() {
    const playerMessage = this.input;
    this.input = "";

    this.text.setText("NPC is thinking...");

    const res = await fetch("/api/npc-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: playerMessage,
        context: "You are a dungeon spirit in a roguelike game."
      }),
    });

    const data = await res.json();

    this.text.setText(`NPC: ${data.reply}`);
  }
}
