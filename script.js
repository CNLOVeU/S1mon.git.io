// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载动画
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);

    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', function() {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 500);
    });

    // 响应式菜单
    const menuButton = document.querySelector('.md\:hidden');
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="#home">首页</a>
        <a href="#about">关于我</a>
        <a href="#experience">工作经历</a>
        <a href="#skills">技能</a>
        <a href="#hobbies">兴趣爱好</a>
        <a href="#contact">联系方式</a>
    `;
    document.body.appendChild(mobileMenu);

    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    });

    menuOverlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // 观察所有部分
    const sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        observer.observe(section);
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 关闭移动菜单
                mobileMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('overflow-hidden');

                // 平滑滚动
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单验证
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || message === '') {
                alert('请填写所有必填字段');
                return false;
            }

            // 简单的邮箱验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址');
                return false;
            }

            // 模拟表单提交
            alert('留言已发送，感谢您的联系！');
            contactForm.reset();
        });
    }

    // 技能卡片悬停效果
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.bg-blue-100');
            if (icon) {
                icon.style.backgroundColor = '#007bff';
                const iconText = icon.querySelector('i');
                if (iconText) {
                    iconText.style.color = 'white';
                }
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.bg-blue-100');
            if (icon) {
                icon.style.backgroundColor = '#e6f0ff';
                const iconText = icon.querySelector('i');
                if (iconText) {
                    iconText.style.color = '#007bff';
                }
            }
        });
    });

    // 兴趣爱好卡片悬停效果
    const hobbyCards = document.querySelectorAll('.group');
    hobbyCards.forEach(function(card) {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });

    // 按钮悬停效果
    const buttons = document.querySelectorAll('button, a[class*="btn-"]');
    buttons.forEach(function(button) {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 表单输入效果
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 页面滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('#home');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
});