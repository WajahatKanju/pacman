import { grid } from "./drawing.js";

const canvas = document.getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");
const pacmanArray = [];
const totalPacmans = 35;

const background = (canvas, context, color = "#000000") => {
  context.save();
  context.fillStyle = color;
  context.rect(0, 0, canvas.width, canvas.height);
  context.fill();
  context.restore();
};

const generateRandom = (min, max) => Math.random() * (max - min + 1) + min;


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
    this.rotationAngle = generateRandom(0, 2) * Math.PI;
  }
  draw() {
		context.save();

    context.translate(this.x, this.y);
    context.rotate(this.rotationAngle);
    context.translate(-this.x, -this.y);
		context.beginPath();
		context.moveTo(this.x, this.y);
		// context.rotate(0.17);
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    context.fillStyle = "yellow";
    context.fill();
    context.restore();
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

const gap = (x1, x2, y1, y2) => Math.sqrt(Math.pow(x2 - x1,2) + Math.pow(y2-y1,2));

const init = () => {
  for (let i = 0; i < totalPacmans; i++) {
		let radius;
		let x;
		let y;

		const getNew = () => {
			radius = generateRandom(10, 30);
			x = generateRandom(radius, canvas.width - radius);
			y = generateRandom(radius, canvas.height - radius);
		}
		getNew();
		
		if(i !== 0){
			for (let j = 0; j < pacmanArray.length; j++) {
				if(gap(x, pacmanArray[j].x, y, pacmanArray[j].y) < radius + pacmanArray[j].radius){
					getNew();
					j = -1;
				}
				
			}
		}

		pacmanArray.push(new Pacman(x, y, radius));
  }
};


init();

animate();
