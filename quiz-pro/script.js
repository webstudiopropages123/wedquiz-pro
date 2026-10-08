// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const categoryCards = document.querySelectorAll('.category-card');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCount = document.getElementById('question-count');
const progressBar = document.getElementById('progress-bar');
const timerDisplay = document.getElementById('timer');
const finalScore = document.getElementById('final-score');
const performanceMsg = document.getElementById('performance-msg');
const restartBtn = document.getElementById('restart-btn');

// State Variables
let currentCategory = null;
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 15;
let canAnswer = true;

// Init
function init() {
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            startQuiz(card.dataset.category);
        });
    });

    restartBtn.addEventListener('click', resetQuiz);
}

function startQuiz(category) {
    currentCategory = category;
    currentQuestions = [...quizData[category]].sort(() => Math.random() - 0.5); // Randomize
    currentIndex = 0;
    score = 0;
    
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    showQuestion();
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    questionText.innerText = q.q;
    questionCount.innerText = `Question ${currentIndex + 1}/20`;
    
    // Update progress bar
    progressBar.style.width = `${((currentIndex) / 20) * 100}%`;
    
    // Fill options
    optionsContainer.innerHTML = '';
    q.a.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        
        const labelSpan = document.createElement('span');
        labelSpan.innerText = `${String.fromCharCode(65 + index)}.`;
        
        const textSpan = document.createElement('span');
        textSpan.className = 'option-text';
        textSpan.textContent = option;
        
        div.appendChild(labelSpan);
        div.appendChild(textSpan);
        
        div.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(div);
    });

    startTimer();
    canAnswer = true;
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.innerText = timeLeft;
    timerDisplay.style.borderColor = 'var(--timer-color)';
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        
        if (timeLeft <= 5) {
            timerDisplay.style.borderColor = 'var(--wrong)';
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function selectOption(index) {
    if (!canAnswer) return;
    canAnswer = false;
    clearInterval(timer);

    const q = currentQuestions[currentIndex];
    const options = optionsContainer.querySelectorAll('.option');
    
    if (index === q.correct) {
        score++;
        options[index].classList.add('correct');
    } else {
        options[index].classList.add('wrong');
        options[q.correct].classList.add('correct');
    }

    options.forEach(opt => opt.classList.add('disabled'));

    setTimeout(nextQuestion, 1500);
}

function handleTimeout() {
    canAnswer = false;
    const q = currentQuestions[currentIndex];
    const options = optionsContainer.querySelectorAll('.option');
    
    options[q.correct].classList.add('correct');
    options.forEach(opt => opt.classList.add('disabled'));

    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < 20) {
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    finalScore.innerText = score;
    
    if (score === 20) performanceMsg.innerText = "Legendary! Perfect score!";
    else if (score >= 15) performanceMsg.innerText = "Excellent! You're a pro!";
    else if (score >= 10) performanceMsg.innerText = "Good job! Keep practicing.";
    else performanceMsg.innerText = "Keep learning, you'll get there!";
}

function resetQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}

init();
