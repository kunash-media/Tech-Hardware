document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', function () {
        navbar.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 4000); // 4 seconds
    }

    function pauseSlider() {
        clearInterval(slideInterval);
    }

    function initSlider() {
        if (!slides.length || !dots.length) return;

        showSlide(0);
        startSlider();

        const sliderContainer = document.querySelector('.slider-container');

        // Pause slider on hover
        sliderContainer.addEventListener('mouseenter', pauseSlider);
        sliderContainer.addEventListener('mouseleave', startSlider);

        // Dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                pauseSlider();
                showSlide(index);
                startSlider();
            });
        });
    }

    initSlider();

    // Highlight active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Sticky Header on scroll
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'var(--white)';
            header.style.boxShadow = 'var(--shadow)';
        }
    });
});
