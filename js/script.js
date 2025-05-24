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

    // Обработка кнопки "Заказать звонок" - УДАЛЕН ALERT
    const callButton = document.querySelector('.btn-call');
    if (callButton) {
        callButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleCallButtonClick();
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

    // Обработка формы - УДАЛЕН ALERT
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            // Здесь будет AJAX/Fetch запрос
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

    // Единая функция для обработки кнопки "Заказать звонок"
    function handleCallButtonClick() {
        // Закрываем меню, если открыто
        const burger = document.querySelector('.burger-menu');
        const nav = document.querySelector('.nav');
        if (burger?.classList.contains('active')) {
            burger.classList.remove('active');
            nav?.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        
        // Плавный скролл к форме
        const contactsSection = document.getElementById('contacts');
        if (contactsSection) {
            contactsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Фокус на первом поле формы
            setTimeout(() => {
                const firstInput = document.querySelector('#feedback-form input');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 500);
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Для мобильных устройств добавляем обработчик на весь элемент
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', function(e) {
                // Проверяем, что кликнули не по кнопке или тексту
                if (!e.target.closest('.portfolio-overlay')) {
                    const downloadBtn = this.querySelector('.mobile-download');
                    if (downloadBtn) {
                        // Программно кликаем по скрытой кнопке скачивания
                        downloadBtn.click();
                    }
                }
            });
        });
    }
    
    // Обновляем при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Удаляем обработчики для десктопной версии
            document.querySelectorAll('.portfolio-item').forEach(item => {
                item.replaceWith(item.cloneNode(true));
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация портфолио
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Удаляем активный класс у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                button.classList.add('active');
                
                const filterValue = button.dataset.filter;
                
                // Фильтруем элементы
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.dataset.category === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
});

function scrollToForm() {
    const form = document.getElementById('feedback-form');
    form.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Дополнительно можно подсветить форму
    form.style.boxShadow = '0 0 0 3px rgba(255,109,0,0.3)';
    setTimeout(() => {
        form.style.boxShadow = 'none';
    }, 2000);
}


// Обработка формы
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const messageDiv = document.getElementById('form-message');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Сохраняем исходный текст кнопки
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    messageDiv.style.display = 'none';
    
    // Собираем данные формы
    const formData = new FormData(form);
    
    // Отправка AJAX
    fetch('send-form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        messageDiv.textContent = data.success || data.error;
        messageDiv.style.color = data.success ? 'green' : 'red';
        
        if (data.success) {
            form.reset();
        }
    })
    .catch(error => {
        messageDiv.textContent = 'Ошибка соединения. Попробуйте позже.';
        messageDiv.style.color = 'red';
    })
    .finally(() => {
        messageDiv.style.display = 'block';
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    });
});