/* ========================================
   S1mon 个人网站 - 交互脚本
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Loader ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 300);
    });
    // Fallback: hide after 3s even if not fully loaded
    setTimeout(() => loader.classList.add('hidden'), 3000);

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        navbar.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
    }, { passive: true });

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    const observerNav = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinksAll.forEach(link => {
                    link.classList.toggle('active',
                        link.dataset.section === entry.target.id);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-72px 0px -50% 0px' });

    sections.forEach(section => observerNav.observe(section));

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll(
        '.section-header, .about-grid, .timeline-item, ' +
        '.portfolio-item, .skill-card, .hobby-card, ' +
        '.contact-grid, .info-card'
    );

    // Add reveal class to all
    revealElements.forEach(el => el.classList.add('reveal'));

    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observerReveal.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => observerReveal.observe(el));

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 72; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Hero canvas particles ---
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticles() {
            particles = [];
            const count = Math.min(60, Math.floor(window.innerWidth / 20));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    radius: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(108, 92, 231, ${p.opacity})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(108, 92, 231, ${0.1 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationId = requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });

        // Pause animation when not visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) drawParticles();
                } else {
                    cancelAnimationFrame(animationId);
                    animationId = null;
                }
            });
        });

        heroObserver.observe(document.getElementById('home'));
    }

    // --- Contact form ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showNotification('请填写所有字段', 'error');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }

            // Simulate submission (replace with actual backend later)
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '发送中...';
            btn.disabled = true;

            setTimeout(() => {
                showNotification('消息已发送，感谢你的联系！', 'success');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // --- Notification system ---
    function showNotification(message, type = 'success') {
        // Remove existing
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 2rem;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            z-index: 10001;
            animation: slideInRight 0.4s ease;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00b894, #00cec9)' : 'linear-gradient(135deg, #e17055, #d63031)'};
            box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.4s ease forwards';
            setTimeout(() => notification.remove(), 400);
        }, 3000);
    }

    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // --- Portfolio item hover parallax ---
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const overlay = item.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
            }
        });

        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = 'translate(0, 0)';
            }
        });
    });

    // --- Typing effect for hero (optional subtle touch) ---
    const heroDesc = document.querySelector('.hero-desc');
    if (heroDesc) {
        const text = heroDesc.textContent;
        heroDesc.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroDesc.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        // Start typing after initial animations
        setTimeout(typeWriter, 1200);
    }

    // --- Performance: reduce motion for users who prefer it ---
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('visible');
        });
        if (canvas) {
            const ctx = canvas.getContext('2d');
            cancelAnimationFrame(animationId);
        }
    }
});
