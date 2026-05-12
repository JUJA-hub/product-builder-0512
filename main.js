document.addEventListener('DOMContentLoaded', () => {
    const lottoContainer = document.getElementById('lotto-container');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // --- Theme Logic ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark');
            body.classList.remove('light');
            themeIcon.textContent = '☀️';
        } else {
            body.classList.add('light');
            body.classList.remove('dark');
            themeIcon.textContent = '🌙';
        }
    }

    // --- Lotto Generation Logic ---
    generateBtn.addEventListener('click', () => {
        const numbers = generateLottoNumbers();
        displayNumbers(numbers);
    });

    function generateLottoNumbers() {
        const numbers = [];
        while (numbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        return numbers.sort((a, b) => a - b);
    }

    function displayNumbers(numbers) {
        lottoContainer.innerHTML = '';
        
        numbers.forEach((num, index) => {
            const ball = document.createElement('div');
            ball.className = `ball ${getRangeClass(num)}`;
            ball.textContent = num;
            ball.style.animationDelay = `${index * 0.1}s`;
            lottoContainer.appendChild(ball);
        });
    }

    function getRangeClass(num) {
        if (num <= 10) return 'range-1';
        if (num <= 20) return 'range-2';
        if (num <= 30) return 'range-3';
        if (num <= 40) return 'range-4';
        return 'range-5';
    }
});
