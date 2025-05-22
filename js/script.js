// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Модальное окно для кнопки "Заказать звонок"
document.querySelector('.btn-call').addEventListener('click', function() {
    // Здесь будет код открытия модалки
    alert('Форма обратной связи будет здесь!');
});

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

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Обработка формы
const feedbackForm = document.getElementById('feedback-form');
feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь должна быть отправка формы (AJAX/Fetch)
    const formData = new FormData(this);
    
    // Временная заглушка
    alert('Спасибо! Ваша заявка отправлена.');
    this.reset();
});

// Анимация при скролле
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Пример: изменение шапки при скролле
    if (scrollPosition > 100) {
        document.querySelector('.header').style.background = 'rgba(255,255,255,0.95)';
    } else {
        document.querySelector('.header').style.background = 'white';
    }
});