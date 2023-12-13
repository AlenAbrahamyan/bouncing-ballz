"use strict";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
var Circle = /** @class */ (function () {
    function Circle(_a) {
        var x = _a.x, y = _a.y, radius = _a.radius, damping = _a.damping, color = _a.color, velocityX = _a.velocityX;
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
    Circle.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    Circle.prototype.update = function (ctx, canvas) {
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
    };
    return Circle;
}());
var circles = [];
canvas.addEventListener("click", function (e) {
    var circleProps = {
        x: e.offsetX,
        y: e.offsetY,
        radius: getRandomNumberInRange(15, 35),
        damping: getRandomNumberInRange(0.4, 0.9),
        color: getRandomRGBColor(),
        velocityX: getRandomNumberInRange(-6, 6),
    };
    circles.push(new Circle(circleProps));
});
function animate() {
    if (!ctx) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function (circle) { return circle.update(ctx, canvas); });
    requestAnimationFrame(animate);
}
function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomRGBColor() {
    var red = Math.floor(getRandomNumberInRange(0, 255));
    var green = Math.floor(getRandomNumberInRange(0, 255));
    var blue = Math.floor(getRandomNumberInRange(0, 255));
    return "rgb(".concat(red, ", ").concat(green, ", ").concat(blue, ")");
}
animate();
