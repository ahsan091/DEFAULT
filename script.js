// Countdown Timer
function updateCountdown() {
    const now = new Date();
    let future = new Date(now.getFullYear(), now.getMonth(), 29);

    if (now.getDate() > 29) {
        future.setMonth(future.getMonth() + 1);
    }

    const diff = future - now;

    document.getElementById("days").innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById("hours").innerText = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    document.getElementById("minutes").innerText = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
    document.getElementById("seconds").innerText = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Network Animation
const canvas = document.getElementById('networkCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Point {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
}

const points = Array.from({ length: 100 }, () => new Point());

function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#00ff0033';
    ctx.fillStyle = '#00ff00';

    points.forEach(point => {
        point.update();
        
        // Draw connections
        points.forEach(otherPoint => {
            const dx = point.x - otherPoint.x;
            const dy = point.y - otherPoint.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.stroke();
            }
        });

        // Draw points
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(drawNetwork);
}

drawNetwork();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
