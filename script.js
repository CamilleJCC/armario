import { db } from './firebase-config.js';
import { ref, set, push } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

const testRef = ref(db, 'connection-test');
set(testRef, {
    lastAccess: new Date().toISOString(),
    status: 'connected'
});

document.addEventListener('DOMContentLoaded', () => {
    const magnifier = document.querySelector('.magnifying-glass');
    const artwork = document.querySelector('.artwork');
    const revealBtn = document.querySelector('.reveal-btn');
    const input = document.querySelector('.magic-input');
    const answersContainer = document.querySelector('.answers-container');
    const overlay = document.getElementById('overlay');
    const closeButtons = document.querySelectorAll('.close-btn');
    const tooltipText = document.querySelector('.tooltip-text');
    const plusPopup = document.getElementById('tooltipText');

    function updateZoom(e) {
        const rect = artwork.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const maxX = rect.width - magnifier.offsetWidth;
        const maxY = rect.height - magnifier.offsetHeight;
        
        const boundedX = Math.max(0, Math.min(maxX, x - magnifier.offsetWidth / 2));
        const boundedY = Math.max(0, Math.min(maxY, y - magnifier.offsetHeight / 2));
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            magnifier.style.display = 'block';
            magnifier.style.left = `${boundedX}px`;
            magnifier.style.top = `${boundedY}px`;
            magnifier.style.backgroundImage = `url(${artwork.src})`;
            magnifier.style.backgroundPosition = `${-x * 2 + magnifier.offsetWidth/2}px ${-y * 2 + magnifier.offsetHeight/2}px`;
            magnifier.style.backgroundSize = `${artwork.width * 2}px`;
        } else {
            magnifier.style.display = 'none';
        }
    }

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    function getRandomColor() {
        const colors = ['#b5f0de', '#fab8a1', '#faf7ba', '#c2b2ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    async function handleReveal() {
        if (input.value.trim()) {
            try {
                const answersRef = ref(db, 'amigas-answers');
                const newAnswerRef = push(answersRef);
                const dataToSave = {
                    answer: input.value,
                    timestamp: new Date().toISOString()
                };
                await set(newAnswerRef, dataToSave);

                const newAnswer = document.createElement('div');
                newAnswer.className = 'revealed-answer reveal-animation';
                newAnswer.textContent = input.value;
                newAnswer.style.position = 'relative';
                newAnswer.style.background = getRandomColor();
                
                answersContainer.appendChild(newAnswer);
                createSparkles(newAnswer);
                input.value = '';
            } catch (error) {
                console.log('Error:', error.message);
            }
        }
    }

    // Event Listeners
    artwork.addEventListener('mousemove', updateZoom);
    artwork.addEventListener('mouseleave', () => {
        magnifier.style.display = 'none';
    });

    
    plusBtn.addEventListener('click', () => {
        if (tooltipText.style.visibility === 'visible') {
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.display = 'none';
        } else {
            tooltipText.style.visibility = 'visible';
            tooltipText.style.display = 'block';
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    });

    revealBtn.addEventListener('click', handleReveal);
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleReveal();
        }
    });
});
