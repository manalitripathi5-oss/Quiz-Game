const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used to style a webpage?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        answer: 1
    },
    {
        question: "Which language makes a webpage interactive?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    },
    {
        question: "Which tag is used to create a paragraph in HTML?",
        options: [
            "<h1>",
            "<p>",
            "<div>",
            "<br>"
        ],
        answer: 1
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [
            ".",
            "#",
            "*",
            "@"
        ],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const finalScore = document.getElementById("final-score");

function loadQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    optionsElement.innerHTML = "";

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        button.onclick = () => selectAnswer(index, button);

        optionsElement.appendChild(button);
    });
}

function selectAnswer(selectedIndex, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;

    const correctIndex = questions[currentQuestion].answer;
    const allOptions = document.querySelectorAll(".option");

    if (selectedIndex === correctIndex) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        allOptions[correctIndex].classList.add("correct");
    }

    scoreElement.textContent = `Score: ${score}`;
}

function nextQuestion() {

    if (!answered) {
        alert("Please select an answer first!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {

    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    nextButton.style.display = "none";
    questionNumber.style.display = "none";
    scoreElement.style.display = "none";

    resultElement.style.display = "block";

    finalScore.textContent =
        `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    questionElement.style.display = "block";
    optionsElement.style.display = "flex";
    nextButton.style.display = "block";
    questionNumber.style.display = "inline";
    scoreElement.style.display = "inline";

    resultElement.style.display = "none";

    loadQuestion();
}

loadQuestion();