class ParticleBackground {
  constructor(section) {
    this.canvas = section.querySelector(".section-bg");
    this.ctx = this.canvas.getContext("2d");
    this.color = section.dataset.bg;
    this.points = [];
    this.resize();
    this.init();
    this.animate();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = this.canvas.parentElement.offsetHeight;
  }

  init(count = 80) {
    this.points = Array.from({ length: count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));
  }

  drawPoint(p) {
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  drawLines() {
    for (let i = 0; i < this.points.length; i++) {
      for (let j = i + 1; j < this.points.length; j++) {
        const dx = this.points[i].x - this.points[j].x;
        const dy = this.points[i].y - this.points[j].y;
        const d = Math.hypot(dx, dy);

        if (d < 140) {
          this.ctx.strokeStyle = "rgba(255,255,255,0.07)";
          this.ctx.beginPath();
          this.ctx.moveTo(this.points[i].x, this.points[i].y);
          this.ctx.lineTo(this.points[j].x, this.points[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x <= 0 || p.x >= this.canvas.width) p.vx *= -1;
      if (p.y <= 0 || p.y >= this.canvas.height) p.vy *= -1;

      this.drawPoint(p);
    });

    this.drawLines();
    requestAnimationFrame(() => this.animate());
  }
}

document.querySelectorAll(".section").forEach(section => {
  new ParticleBackground(section);
});
