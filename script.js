// 页面加载完成后执行
$(document).ready(function() {
    // 滚动动画
    $(window).scroll(function() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var elementVisible = 150;
            if (elementTop < $(window).scrollTop() + $(window).height() - elementVisible) {
                $(this).addClass('visible');
            }
        });
    });

    // 导航栏滚动效果
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('.navbar').addClass('bg-dark');
        } else {
            $('.navbar').removeClass('bg-dark');
        }
    });

    // 表单验证
    $('form').submit(function(e) {
        e.preventDefault();
        var name = $('#name').val();
        var email = $('#email').val();
        var message = $('#message').val();

        if (name === '' || email === '' || message === '') {
            alert('请填写所有必填字段');
            return false;
        }

        // 简单的邮箱验证
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('请输入有效的邮箱地址');
            return false;
        }

        // 模拟表单提交
        alert('留言已发送，感谢您的联系！');
        $('form')[0].reset();
    });

    // 平滑滚动
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // 技能卡片悬停效果
    $('.skill-card').hover(function() {
        $(this).find('.skill-icon').css('background', '#007bff');
        $(this).find('.skill-icon i').css('color', 'white');
    }, function() {
        $(this).find('.skill-icon').css('background', '#f8f9fa');
        $(this).find('.skill-icon i').css('color', '#007bff');
    });

    // 兴趣爱好卡片悬停效果
    $('.hobby-card').hover(function() {
        $(this).find('img').css('transform', 'scale(1.05)');
        $(this).find('img').css('transition', 'transform 0.3s ease');
    }, function() {
        $(this).find('img').css('transform', 'scale(1)');
    });

    // 初始化页面动画
    setTimeout(function() {
        $('.hero-section').addClass('fade-in');
    }, 100);

    // 滚动时添加动画类
    $(window).scroll(function() {
        var scrollPosition = $(window).scrollTop();
        var windowHeight = $(window).height();

        $('section').each(function() {
            var sectionTop = $(this).offset().top;
            var sectionHeight = $(this).height();

            if (scrollPosition >= sectionTop - windowHeight + 200) {
                $(this).addClass('fade-in');
            }
        });
    });
});