document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-class');
    const textarea = document.querySelector('textarea');
    const submitBtn = document.querySelector('.submit-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            createSparkles(button);
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 500);
        });
    });

    submitBtn.addEventListener('click', () => {
        if (textarea.value.trim()) {
            createSparkles(submitBtn);
            textarea.value = '';
        }
    });

    function createSparkles(element) {
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }
});
