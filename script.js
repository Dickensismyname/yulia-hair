
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// -------------------------
// СТВОРЕННЯ ЧАСТИНОК
// -------------------------

function createParticles() {

    particles = [];

    const count = Math.min(
        100,
        Math.floor(window.innerWidth / 10)
    );

    for (let i = 0; i < count; i++) {

        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,

            size: Math.random() * 2.5 + 0.5,

            speedX: (Math.random() - 0.5) * 0.3,
            speedY: Math.random() * -0.4 - 0.1,

            opacity: Math.random() * 0.6 + 0.2,

            phase: Math.random() * Math.PI * 2
        });
    }
}

createParticles();


// -------------------------
// АНІМАЦІЯ ЧАСТИНОК
// -------------------------

function animateParticles(time) {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.x += p.speedX;
        p.y += p.speedY;

        // Якщо вилетіла за екран
        if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
        }

        const twinkle =
            Math.sin(time * 0.002 + p.phase) * 0.3;

        const opacity =
            Math.max(0.05, p.opacity + twinkle);

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255, 180, 230, ${opacity})`;

        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

requestAnimationFrame(animateParticles);


// -------------------------
// КНОПКА
// -------------------------

const button =
    document.getElementById("magicButton");

const secret =
    document.getElementById("secretMessage");

button.addEventListener("click", () => {

    secret.classList.toggle("show");

    if (secret.classList.contains("show")) {

        button.textContent =
            "✨ Оце так! ✨";

        createHeartExplosion();

    } else {

        button.textContent =
            "Натисни сюди ✨";
    }
});


// -------------------------
// СЕРДЕЧКА ПРИ КЛІКУ
// -------------------------

function createHeartExplosion() {

    for (let i = 0; i < 25; i++) {

        const heart =
            document.createElement("div");

        heart.textContent = "♥";

        heart.style.position = "fixed";

        heart.style.left = "50%";
        heart.style.top = "50%";

        heart.style.zIndex = "10";

        heart.style.pointerEvents = "none";

        heart.style.color = "#ff72c6";

        heart.style.fontSize =
            `${Math.random() * 20 + 12}px`;

        document.body.appendChild(heart);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 250 + 100;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        heart.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.3)`,
                    opacity: 0
                }
            ],
            {
                duration: 1200 + Math.random() * 500,
                easing: "cubic-bezier(.17,.67,.3,1.3)"
            }
        );

        setTimeout(() => {
            heart.remove();
        }, 1800);
    }
}
