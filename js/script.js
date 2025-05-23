document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Модальное окно для кнопки "Заказать звонок"
    const callButton = document.querySelector('.btn-call');
    if (callButton) {
        callButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Форма обратной связи будет здесь!');
        });
    }

    // Анимация карточек товаров
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Фильтрация портфолио
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.dataset.filter;
                
                portfolioItems.forEach(item => {
                    item.style.display = (filterValue === 'all' || item.dataset.category === filterValue) 
                        ? 'block' 
                        : 'none';
                });
            });
        });
    }

    // Обработка формы
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь должна быть отправка формы (AJAX/Fetch)
            const formData = new FormData(this);
            
            // Временная заглушка
            alert('Спасибо! Ваша заявка отправлена.');
            this.reset();
        });
    }

    // Анимация при скролле
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.background = window.scrollY > 100 
                ? 'rgba(255,255,255,0.95)' 
                : 'white';
        });
    }

    // Бургер-меню
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    
    if (burger && nav) {
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
            overlay.style.display = nav.classList.contains('active') ? 'block' : 'none';
        });
        
        // Закрытие меню при клике на оверлей или ссылку
        overlay.addEventListener('click', closeMenu);
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        function closeMenu() {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
            overlay.style.display = 'none';
        }
    }
});