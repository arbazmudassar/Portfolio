const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const mouse = { x: null, y: null };

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.3; // 🔥 SMALLER PARTICLES
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.color = Math.random() > 0.75 ? "#00f5ff" : "rgba(255,255,255,0.2)";
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // wrap around screen
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;

                // soft cursor attraction (only aqua particles)
                if (this.color === "#00f5ff" && mouse.x && mouse.y) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    this.x += dx * 0.005;
                    this.y += dy * 0.005;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < 100; i++) { // fewer particles = cleaner background
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.fillStyle = "rgba(15, 23, 42, 0.25)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

document.addEventListener("DOMContentLoaded", () => {

    const skillsSection = document.querySelector("#skills");
    const fills = document.querySelectorAll(".fill");
    const percents = document.querySelectorAll(".percent");

    function animateSkills() {

        fills.forEach((fill, index) => {
            const value = fill.getAttribute("data-value");

            // BAR ANIMATION
            fill.style.width = value + "%";

            // NUMBER ANIMATION
            if (percents[index]) {
                let count = 0;
                const target = parseInt(value);

                const interval = setInterval(() => {
                    if (count >= target) {
                        clearInterval(interval);
                    } else {
                        count++;
                        percents[index].innerText = count + "%";
                    }
                }, 20);
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(skillsSection);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(skillsSection);
});


document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll("section, .col-md, .card, .project, .skill");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const el = entry.target;

                // Stagger delay effect based on position
                const delay = el.getAttribute("data-delay") || 0;

                setTimeout(() => {
                    el.classList.add("show");
                }, delay);

                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach((el, index) => {

        // Base class
        el.classList.add("reveal");

        // Auto stagger delay
        el.setAttribute("data-delay", index * 80);

        observer.observe(el);
    });

});