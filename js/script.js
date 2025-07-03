document.addEventListener('DOMContentLoaded', function() {
    // Конфигурация
    const CONFIG = {
        BOT_TOKEN: '7904532193:AAHGVxo1H9sRxAzkWLNDo5d7M4LTY7DJoMY',
        CHAT_IDS: ['5165889394', '818287296'], // Массив с двумя Chat ID
        FORM_ID: 'feedback-form',
        SCROLL_OFFSET: 100
    };

    // 1. Плавная прокрутка для якорных ссылок
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 2. Обработка кнопки "Заказать звонок"
    function setupCallButton() {
        const callButton = document.querySelector('.btn-call');
        if (callButton) {
            callButton.addEventListener('click', handleCallButtonClick);
        }
    }

    // 3. Анимация карточек товаров
    function setupProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                card.style.transition = 'all 0.3s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    // 4. Фильтрация портфолио (объединенная версия)
    function setupPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        if (filterButtons.length && portfolioItems.length) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filterValue = button.dataset.filter;
                    
                    portfolioItems.forEach(item => {
                        if (filterValue === 'all' || item.dataset.category === filterValue) {
                            item.classList.remove('hidden');
                            item.style.display = 'block';
                        } else {
                            item.classList.add('hidden');
                            item.style.display = 'none';
                        }
                    });
                });
            });
        }

        // Мобильные события
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.portfolio-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    if (!e.target.closest('.portfolio-overlay')) {
                        const downloadBtn = this.querySelector('.mobile-download');
                        downloadBtn?.click();
                    }
                });
            });
        }
    }

    // 5. Обработка формы
    function setupForm() {
        const form = document.getElementById(CONFIG.FORM_ID);
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            const messageDiv = document.getElementById('form-message');
            
            // Показать состояние загрузки
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;
            messageDiv.style.display = 'none';
            
            try {
                const formData = new FormData(form);
                const text = `📩 Новая заявка с сайта:\n\n` +
                             `👤 Имя: ${formData.get('name')}\n` +
                             `📧 Email: ${formData.get('email')}\n` +
                             `📞 Телефон: ${formData.get('phone') || 'не указан'}\n` +
                             `✉️ Сообщение: ${formData.get('message') || 'нет текста'}`;
                
                // Отправляем сообщение во все указанные чаты
                const sendPromises = CONFIG.CHAT_IDS.map(chatId => {
                    return fetch(`https://api.telegram.org/bot${CONFIG.BOT_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: text,
                            parse_mode: 'HTML'
                        })
                    });
                });

                // Ждем завершения всех отправок
                const responses = await Promise.all(sendPromises);
                const results = await Promise.all(responses.map(r => r.json()));

                // Проверяем все ответы
                const allSuccess = results.every(r => r.ok);
                
                if (allSuccess) {
                    messageDiv.textContent = 'Сообщение успешно отправлено!';
                    messageDiv.className = 'success';
                    form.reset();
                } else {
                    // Если хотя бы одна отправка не удалась
                    const failedCount = results.filter(r => !r.ok).length;
                    messageDiv.textContent = `Сообщение отправлено, но ${failedCount > 1 ? 'некоторые' : 'один'} получатель не получил его`;
                    messageDiv.className = 'warning';
                }
            } catch (error) {
                console.error('Ошибка отправки:', error);
                messageDiv.textContent = 'Ошибка отправки. Попробуйте позже.';
                messageDiv.className = 'error';
            } finally {
                messageDiv.style.display = 'block';
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }

    
    // 6. Анимация хедера при скролле
    function setupHeaderAnimation() {
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', () => {
                header.style.background = window.scrollY > CONFIG.SCROLL_OFFSET 
                    ? 'rgba(255,255,255,0.95)' 
                    : 'white';
                header.style.transition = 'background 0.3s ease';
            });
        }
    }

    // 7. Бургер-меню
    function setupBurgerMenu() {
        const burger = document.querySelector('.burger-menu');
        const nav = document.querySelector('.nav');
        
        if (burger && nav) {
            const overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
            
            burger.addEventListener('click', function(e) {
                e.preventDefault();
                toggleMenu();
            });
            
            overlay.addEventListener('click', closeMenu);
            document.querySelectorAll('.nav a').forEach(link => {
                link.addEventListener('click', closeMenu);
            });
            
            function toggleMenu() {
                burger.classList.toggle('active');
                nav.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
                overlay.style.display = nav.classList.contains('active') ? 'block' : 'none';
            }
            
            function closeMenu() {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('no-scroll');
                overlay.style.display = 'none';
            }
        }
    }

    // 8. Общая функция для кнопки "Заказать звонок"
    function handleCallButtonClick(e) {
        if (e) e.preventDefault();
        
        // Закрываем меню, если открыто
        const burger = document.querySelector('.burger-menu');
        if (burger?.classList.contains('active')) {
            burger.classList.remove('active');
            document.querySelector('.nav')?.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        
        // Плавный скролл к форме
        const contactsSection = document.getElementById('contacts');
        if (contactsSection) {
            window.scrollTo({
                top: contactsSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Фокус на первом поле формы
            setTimeout(() => {
                document.querySelector(`#${CONFIG.FORM_ID} input`)?.focus();
            }, 500);
        }
    }

    // Инициализация всех функций
    function init() {
        setupSmoothScroll();
        setupCallButton();
        setupProductCards();
        setupPortfolioFilter();
        setupForm();
        setupHeaderAnimation();
        setupBurgerMenu();

        // Инициализация AOS если есть
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true
            });
        }
    }

    init();
});


document.querySelectorAll('.btn-details').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-scroll-to');
      document.getElementById(targetId).scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  });



// Удаляем класс no-js при загрузке
document.body.classList.remove('no-js');

// Инициализация карусели с точными настройками центрирования
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.glide')) {
        new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 3,
            gap: 0,
            animationDuration: 600,
            peek: 0,
            bound: true,
            breakpoints: {
                768: {
                    perView: 1,
                    gap: 0,
                    peek: 0
                }
            }
        }).mount();
    }
});


// Инициализация каруселей портфолио
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация каждой карусели портфолио
    document.querySelectorAll('.portfolio-glide').forEach(function(element) {
        new Glide(element, {
            type: 'carousel',
            perView: 1,
            animationDuration: 500,
            hoverpause: true,
            dragThreshold: 20
        }).mount();
    });
});



// Инициализация каруселей фотографий
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.equipment-glide').forEach(function(carousel) {
        new Glide(carousel, {
            type: 'carousel',
            perView: 1,
            animationDuration: 500,
            dragThreshold: 20,
            gap: 0
        }).mount();
    });
});