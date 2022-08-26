import { grid } from "./drawing.js";

const canvas = document.getElementsByTagName("canvas")[0];
const context = canvas.getContext("2d");

const background = (canvas, context, color = "#000000") => {
  context.save();
  context.fillStyle = color;
  context.rect(0, 0, canvas.width, canvas.height);
  context.fill();
  context.restore();
};

const draw_pacman = (
  x = 200,
  y = 200,
  radius = 150,
  startAngle = Math.PI * 0.2,
  endAngle = Math.PI * 1.8
) => {
  grid(canvas, context);
  context.beginPath();
  context.arc(x, y, radius,startAngle, endAngle);
  context.lineTo(200, 200);
  context.fillStyle = "yellow";
  context.fill();
};

const animatePacman = () => {
	let x = 200;
  let y = 200;
  let radius = 150;
  let startAngle = Math.PI * 0.2;
  let endAngle = Math.PI * 1.8;
	draw_pacman(x, y, radius, startAngle, endAngle);
}

const animate = () => {
	context.clearRect(0, 0, canvas.width, canvas.height);
	background(canvas, context);
  requestAnimationFrame(animate);
	draw_pacman();
};

animate();
