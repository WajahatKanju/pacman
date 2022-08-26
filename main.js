import { grid } from "./drawing.js";

const canvas = document.getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");
const pacmanArray = [];

const background = (canvas, context, color = "#000000") => {
  context.save();
  context.fillStyle = color;
  context.rect(0, 0, canvas.width, canvas.height);
  context.fill();
  context.restore();
};

class Pacman {
  constructor(
    x = 200,
    y = 200,
    radius = 150,
    startAngle = Math.PI * 0.2,
    endAngle = Math.PI * 1.8,
    increase_velocity = 0.01 * Math.PI
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.increase_velocity = increase_velocity;
  }
  draw() {
    grid(canvas, context);
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    context.lineTo(200, 200);
    context.fillStyle = "yellow";
    context.fill();
  }

  animate() {
    if (this.startAngle < 0) {
      this.open = true;
    }
		if(this.startAngle > Math.PI * 0.2){
			this.open = false;
		}
    if (!this.open) {
      this.startAngle = this.startAngle - this.increase_velocity;
      this.endAngle = this.endAngle + this.increase_velocity;
    } else {
      this.startAngle = this.startAngle + this.increase_velocity;
      this.endAngle = this.endAngle - this.increase_velocity;
    }

    this.draw();
  }
}

let pacman = new Pacman();
const animate = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  background(canvas, context);
  requestAnimationFrame(animate);
  pacman.animate();
};

animate();
