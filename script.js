document.addEventListener('DOMContentLoaded', () => {
    const buttonsContainer = document.querySelector('.buttons-container');
    const textarea = document.querySelector('textarea');
    const submitBtn = document.querySelector('.submit-btn');

    buttonsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('button-class')) {
            e.target.classList.toggle('active');
            createSparkles(e.target);
        }
    });

    submitBtn.addEventListener('click', () => {
        if (textarea.value.trim()) {
            const newButton = document.createElement('button');
            newButton.className = 'button-class';
            newButton.textContent = textarea.value;
            buttonsContainer.appendChild(newButton);
            createSparkles(newButton);
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
