console.log("hello")
const colorInput = document.getElementById("colorInput");
colorInput.addEventListener("input", function () {
    const chosenColor = colorInput.value;
    const lightColor = chosenColor + "22";
    const r = parseInt(chosenColor.slice(1, 3), 16);
    const g = parseInt(chosenColor.slice(3, 5), 16);
    const b = parseInt(chosenColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightness > 128 ? "#000000" : "#ffffff";
    document.documentElement.style.setProperty('--bs-primary', chosenColor);
    document.documentElement.style.setProperty('--body-bg', lightColor);
    document.documentElement.style.setProperty('--text-color', textColor);
});
const questions = [
    
    {
        question: "A uniform beam is 4 meters long. A 20N weight is placed at 2m from the pivot. Where should a 40N weight be placed to balance the beam in equilibrium?",
        answers: [
            { text: "at 1m from the pivot", correct: true },
            { text: "at 2m from the pivot", correct: false },
            { text: "at 3m from the pivot", correct: false },
            { text: "at 4m from the pivot", correct: false }
        ]
    },
    {
        question: "11x + 14y ≤ 155. <br> Anthony will spend at most $155 to purchase x small cheese pizzas and y large cheese pizzas for a team dinner. The given inequality represents this situation. <br>  Which of the following is the best interpretation of 14y in this context?",
        answers: [
            { text: "The amount, in dollars, Anthony will spend on each small cheese pizza", correct: false },
            { text: "The amount, in dollars, Anthony will spend on each large cheese pizza", correct: false },
            { text: "The total amount, in dollars, Anthony will spend on large cheese pizzas", correct: true },
            { text: "The total amount, in dollars, Anthony will spend on small cheese pizzas", correct: false },
        ]
    },
    {
        question: "How many integers between 100 and 999 have: <br> - an odd ones digit - an even tens digit - an even hundreds digit",
        answers: [
            { text: "98", correct: false },
            { text: "45", correct: false },
            { text: "100", correct: true },
            { text: "120", correct: false },
        ]
    },
    {
        question: "A person stands on a scale inside an elevator. When the elevator begins moving upward, the scale reading increases briefly. Why?",
        answers: [
            { text: "Gravity increases inside elevators.", correct: false },
            { text: "The scale is faulty when moving.", correct: false },
            { text: "The elevator’s upward acceleration increases the normal force on the person.", correct: true },
            { text: "Air pressure increases the person’s weight.", correct: false },
        ]
    },
    {
        question: "A red die and a blue die are rolled. What is the probability that their sum is a perfect square?",
        answers: [
            { text: "7/36", correct: true },
            { text: "1/9", correct: false },
            { text: "1/6", correct: false },
            { text: "5/36", correct: false },
        ]
    },
    {
        question: "You’re holding a heavy book while standing on a bathroom scale. Suddenly, you toss the book straight upward into the air (but it hasn’t landed yet).<br>Question: What happens to the reading on the scale at the instant you throw the book upward?",
        answers: [
            { text: "The scale reading increases briefly.", correct: true },
            { text: "The scale reading decreases briefly", correct: false },
            { text: "The scale reading stays exactly the same", correct: false },
            { text: "The scale reading becomes zero", correct: false },
        ]
    },
    {
        question: "How many integers between 1 and 100 (inclusive) are divisible by both 2 and 3?",
        answers: [
            
            { text: "33", correct: false },
            { text: "50", correct: false },
            { text: "100", correct: false },
            { text: "16", correct: true }
        ]
    },
    {
        question: "You’re standing on a bus that is moving forward at a constant speed. Suddenly, the driver applies the brakes and the bus slows down quickly.",
        answers: [
            { text: "You lurch backward.", correct: false },
            { text: "You lurch forward.", correct: true },
            { text: "You remain perfectly still", correct: false },
            { text: "You move upward.", correct: false },
        ]
    },
    {
        question: "Ophelia is paid $51 in week 1, and $100 per week afterward. How many total weeks must she work so that her average pay is $93?",
        answers: [
            { text: "8 weeks", correct: false },
            { text: "7 days", correct: false },
            { text: "7 weeks", correct: true },
            { text: "5 weeks", correct: false },
        ]
    },
    {
        question: "You have 10 cards laid in a row, face down.  Each card has a different integer written on it (no repeats).<br> Two players are involved:<br>  Player A never sees any of the numbers at any time. Player B is allowed to look at the numbers on cards when asked.<br>  Player A's goal is to arrange the 10 cards so that, from left to right, the numbers on the cards are in increasing order (smallest on the left, largest on the right), all while the cards stay face down for A.<br>  How a move works: On each move, Player A chooses two positions in the row (say, card i and card j).<br>  Then A can: ask Player B to look at those two cards and say which one has the larger number, and/or tell Player B to swap the positions of those two cards.<br>  A can do just a comparison, just a swap, or both comparison and swap in the same move.<br>  Player B always tells the truth and always does exactly what A asks. The question: We are interested in how many moves A might need in the worst case to be absolutely sure the cards are sorted correctly. <br> From the list below, choose the largest number N such that even with the best possible strategy, Player A cannot be sure to finish sorting the cards within N moves",
        answers: [
            { text: "22", correct: false },
            { text: "30", correct: false },
            { text: "21", correct: true },
            { text: "25", correct: false },
        ]
    },
];



// Quiz Elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// ---------------- QUIZ LOGIC ----------------
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    if (nextButton) {
        nextButton.innerHTML = "Next";
    }
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    if (nextButton) nextButton.style.display = "none";
    while (answerButtons && answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    if (nextButton) nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    if (nextButton) {
        nextButton.innerHTML = "Play again";
        nextButton.style.display = "block";
    }

    // Save score to leaderboard
    const nameInput = document.getElementById("playerName");
    const name = nameInput ? nameInput.value : "Anonymous";
    saveScore(name || "Anonymous", score);
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length) {
            handleNextButton();
        } else {
            startQuiz();
        }
    });
}

// ---------------- LEADERBOARD LOGIC ----------------
function saveScore(name, score) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const list = document.getElementById("leaderboard") || document.getElementById("leaderboard-list");
    if (!list) return;

    list.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `<strong>${index + 1}. ${entry.name}</strong> <span>${entry.score}</span>`;
        list.appendChild(li);
    });
}

// ---------------- PAGE CHECK ----------------
document.addEventListener("DOMContentLoaded", () => {
    // If quiz elements exist, start quiz
    if (document.getElementById("question")) {
        startQuiz();
    }

    // If leaderboard exists, show leaderboard
    if (document.getElementById("leaderboard") || document.getElementById("leaderboard-list")) {
        showLeaderboard();
    }
});
