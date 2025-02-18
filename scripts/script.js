document.addEventListener("DOMContentLoaded", () => {
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    const navItems = document.querySelectorAll(".nav-item a");
    const themeToggle = document.getElementById("themeToggle");
    const moonIcon = document.getElementById("moonIcon");
    const sunIcon = document.getElementById("sunIcon");
    const root = document.documentElement;
    const typedText = document.getElementById("typed-text");

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        requestAnimationFrame(() => {
            cursorDot.style.transform = `translate(${posX}px, ${posY}px)`;
            cursorOutline.style.transform = `translate(${posX}px, ${posY}px)`;
        });
    });

    navItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            item.style.transform = "translateY(-3px)";
        });
        item.addEventListener("mouseleave", () => {
            item.style.backgroundColor = "transparent";
            item.style.transform = "translateY(0)";
        });
    });

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);

        if (theme === "light") {
            moonIcon.classList.remove("hidden");
            sunIcon.classList.add("hidden");
        } else {
            sunIcon.classList.remove("hidden");
            moonIcon.classList.add("hidden");
        }
    }

    const savedTheme = localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const newTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });

    const strengths = ["Web Developer", "Java Expert", "Problem Solver"];
    let strengthIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typedText) return;
        const currentStrength = strengths[strengthIndex];

        if (!isDeleting) {
            typedText.textContent = currentStrength.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentStrength.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1000);
                return;
            }
        } else {
            typedText.textContent = currentStrength.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                strengthIndex = (strengthIndex + 1) % strengths.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        item.addEventListener("click", () => {
            // Close any open FAQ
            faqItems.forEach(el => {
                if (el !== item) {
                    el.classList.remove("active");
                }
            });

            // Toggle current FAQ
            item.classList.toggle("active");
        });
    });
});
