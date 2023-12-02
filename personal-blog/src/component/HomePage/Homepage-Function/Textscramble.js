import React from "react";

export default class Textscramble extends React.Component {
  constructor(prop) {
    super();
    this.el = prop;
    this.counter = 0;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.phrases = [
      "- Grow Business -",
      "- Find Leads -",
      "- Discover Touch Points -",
      "- Create Impressions -",
      "- Analyze Opinion's -",
      "- Plan your next move -",
    ];
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.fx = new Textscramble(document.querySelector("#textScramble"));
    this.nextMethod();
  }

  nextMethod() {
    setInterval(async () => {
      if (this.counter >= this.phrases.length) this.counter = 0;
      await this.setText(this.phrases[this.counter]);
    }, 3000);
  }

  setText(newText) {
    if (newText !== undefined) {
      const oldText = document.querySelector("#textScramble")?.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      this.counter++;
      return promise;
    }
  }

  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    document.querySelector("#textScramble").innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
  render() {
    return (
      <div className=".App">
        <div id="textScramble"></div>
      </div>
    );
  }
}
