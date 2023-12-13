const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

interface CircleProps {
	x: number;
	y: number;
	radius: number;
	damping: number;
	velocityX: number;
	color: string;
}

class Circle {
	x: number;
	y: number;
	radius: number;
	velocityX: number;
	velocityY: number;
	damping: number;
	color: string;
	gravity: number;
	friction: number;

	constructor({ x, y, radius, damping, color, velocityX }: CircleProps) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.velocityX = velocityX;
		this.velocityY = 0;
		this.damping = damping;
		this.color = color;
		this.gravity = 0.5;
		this.friction = 0.99;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	update(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
		this.velocityY += this.gravity;
		this.y += this.velocityY;
		this.x += this.velocityX;

		this.velocityX *= this.friction;

		if (Math.abs(this.velocityX) < 0.01) {
			this.velocityX = 0;
		}

		if (this.y + this.radius > canvas.height) {
			this.y = canvas.height - this.radius;
			this.velocityY = -this.velocityY * this.damping;
		}

		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.velocityX = -this.velocityX;
		}

		this.draw(ctx);
	}
}

const circles: Circle[] = [];

canvas.addEventListener("click", function (e: MouseEvent) {
	const circleProps: CircleProps = {
		x: e.offsetX,
		y: e.offsetY,
		radius: getRandomNumberInRange(15, 35),
		damping: getRandomNumberInRange(0.4, 0.9),
		color: getRandomRGBColor(),
		velocityX: getRandomNumberInRange(-6,6),
	};
	circles.push(new Circle(circleProps));
});

function animate(): void {
	if(!ctx){
		return;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	circles.forEach((circle) => circle.update(ctx, canvas));
	requestAnimationFrame(animate);
}

function getRandomNumberInRange(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}

function getRandomRGBColor(): string {
	const red = Math.floor(getRandomNumberInRange(0, 255));
	const green = Math.floor(getRandomNumberInRange(0, 255));
	const blue = Math.floor(getRandomNumberInRange(0, 255));
	return `rgb(${red}, ${green}, ${blue})`;
}

animate();
