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
    this.initalStartAngle = startAngle;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.increase_velocity = increase_velocity;
  }
  draw() {
		context.beginPath();
		context.moveTo(this.x, this.y);
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    context.fillStyle = "yellow";
    context.fill();
  }

  update() {
		
    if (this.startAngle < 0) {
      this.open = true;
    }
    if (this.startAngle > this.initalStartAngle) {
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

let pac = new Pacman();

const animate = () => {
	context.beginPath();
  context.clearRect(0, 0, canvas.width, canvas.height);
  background(canvas, context);
  grid(canvas, context);
  pacmanArray.forEach((pac) => pac.update());
  requestAnimationFrame(animate);
};

const generateRandom = (min, max) => Math.random() * (max - min + 1) + min;

const init = () => {
  for (let i = 0; i < 25; i++) {
    let radius = generateRandom(10, 30);
    let x = generateRandom(radius, canvas.width - radius);
    let y = generateRandom(radius, canvas.height - radius);
    pacmanArray.push(new Pacman(x, y, radius));
  }
};
init();

animate();
