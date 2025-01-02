document.addEventListener('DOMContentLoaded', () => {
    const buttonsContainer = document.querySelector('.buttons-container');
    const textarea = document.querySelector('textarea');
    const submitBtn = document.querySelector('.submit-btn');

    function addNewIdea() {
        if (textarea.value.trim()) {
            const newButton = document.createElement('button');
            newButton.className = 'button-class';
            newButton.textContent = textarea.value;
            buttonsContainer.appendChild(newButton);
            createSparkles(newButton);
            textarea.value = '';
        }
    }

    buttonsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('button-class')) {
            e.target.classList.toggle('active');
            createSparkles(e.target);
        }
    });

    submitBtn.addEventListener('click', addNewIdea);

    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addNewIdea();
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
    function createSparkles(element) {
    const colors = ['#c4e0ff', '#b5f0de', '#ffffff'];
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position around the element
        const rect = element.getBoundingClientRect();
        const x = rect.left + (Math.random() * rect.width);
        const y = rect.top + (Math.random() * rect.height);
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    }
}

// Call this function when revealing words
function revealWord(element) {
    element.style.display = 'block';
    createSparkles(element);
}
});
