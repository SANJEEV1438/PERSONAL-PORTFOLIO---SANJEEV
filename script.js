// Initialize Lenis (Smooth Scroll)
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);



// Preloader & Hero Animations
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    gsap.to('.loader-progress', {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
            tl.to('.loader-text, .loader-progress', {
                opacity: 0,
                y: -20,
                duration: 0.5
            })
            .to('.loader', {
                yPercent: -100,
                duration: 1.2,
                ease: 'power4.inOut'
            })
            .from('.nav', {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, "-=0.6")
            .from('.hero-subtitle', {
                y: '100%',
                duration: 0.8,
                ease: 'power3.out'
            }, "-=0.8")
            .from('.hero-title .line span', {
                y: '110%',
                duration: 1.2,
                stagger: 0.15,
                ease: 'power4.out'
            }, "-=0.6")
            .from('.scroll-indicator', {
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, "-=0.5");
        }
    });
});

// About Section Text Reveal
gsap.registerPlugin(ScrollTrigger);

gsap.to('.editorial-text', {
    backgroundPositionX: '0%',
    ease: 'none',
    scrollTrigger: {
        trigger: '.about',
        start: 'top 50%',
        end: 'bottom 80%',
        scrub: 1
    }
});

// Parallax for Background Text
gsap.to('.about-bg-text', {
    y: () => window.innerHeight * 0.5,
    ease: 'none',
    scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    }
});

// Project Images Reveal & Parallax
const projects = document.querySelectorAll('.project');

projects.forEach(project => {
    const overlay = project.querySelector('.project-overlay');
    const image = project.querySelector('.project-image');
    
    gsap.to(overlay, {
        scaleY: 0,
        duration: 1.5,
        ease: 'power4.inOut',
        scrollTrigger: {
            trigger: project,
            start: 'top 75%',
        }
    });

    gsap.to(image, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Contact Button Reveal Logic
const getInTouchBtn = document.getElementById('getInTouchBtn');
const contactDetails = document.getElementById('contactDetails');

if (getInTouchBtn && contactDetails) {
    getInTouchBtn.addEventListener('click', () => {
        gsap.to(getInTouchBtn, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: 'power3.out',
            onComplete: () => {
                getInTouchBtn.style.display = 'none';
                contactDetails.style.display = 'flex';
                
                // Add hover outlines to new dynamic links
                const newLinks = contactDetails.querySelectorAll('a');
                if (window.matchMedia("(pointer: fine)").matches) {
                    const cursorOutline = document.querySelector('.cursor-outline');
                    newLinks.forEach(link => {
                        link.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
                        link.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
                    });
                }

                gsap.fromTo(contactDetails.children, {
                    opacity: 0,
                    y: 20
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out'
                });
            }
        });
    });
}

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('themeToggleBtn');
const root = document.documentElement;

if (themeToggleBtn) {
    // Check saved local storage theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        root.setAttribute('data-theme', savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        if (currentTheme === 'light') {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Nav Contact Dropdown Interaction
    const navContactToggle = document.getElementById('navContactToggle');
    const navContactDropdown = document.getElementById('navContactDropdown');

    if (navContactToggle && navContactDropdown) {
        navContactToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navContactDropdown.classList.toggle('active');
        });

        // Close when clicking strictly outside
        document.addEventListener('click', (e) => {
            if (!navContactToggle.contains(e.target) && !navContactDropdown.contains(e.target)) {
                navContactDropdown.classList.remove('active');
            }
        });
    }
}
