document.addEventListener('DOMContentLoaded', () => {
    const lottoContainer = document.getElementById('lotto-container');
    const generateBtn = document.getElementById('generate-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    const body = document.body;

    let history = JSON.parse(localStorage.getItem('lottoHistory')) || [];

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
    updateHistoryUI();

    generateBtn.addEventListener('click', () => {
        const numbers = generateLottoNumbers();
        displayNumbers(numbers);
        addToHistory(numbers);
    });

    clearHistoryBtn.addEventListener('click', () => {
        history = [];
        localStorage.setItem('lottoHistory', JSON.stringify(history));
        updateHistoryUI();
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

    function addToHistory(numbers) {
        const timestamp = new Date().toLocaleTimeString();
        history.unshift({ numbers, timestamp });
        if (history.length > 10) history.pop(); // Keep last 10
        localStorage.setItem('lottoHistory', JSON.stringify(history));
        updateHistoryUI();
    }

    function updateHistoryUI() {
        if (history.length === 0) {
            historyList.innerHTML = '<p class="empty-history">아직 생성된 번호가 없습니다.</p>';
            return;
        }

        historyList.innerHTML = '';
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const numbersDiv = document.createElement('div');
            numbersDiv.className = 'history-numbers';
            
            item.numbers.forEach(num => {
                const miniBall = document.createElement('div');
                miniBall.className = `history-ball ${getRangeClass(num)}`;
                miniBall.textContent = num;
                numbersDiv.appendChild(miniBall);
            });

            const timeSpan = document.createElement('span');
            timeSpan.className = 'history-time';
            timeSpan.textContent = item.timestamp;

            historyItem.appendChild(numbersDiv);
            historyItem.appendChild(timeSpan);
            historyList.appendChild(historyItem);
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
