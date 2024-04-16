// Array of quiz questions
const quizQuestions = [
    {
        prompt: "Who directed the movie 'Inception'?",
        choices: ["Steven Spielberg", "Christopher Nolan", "Martin Scorsese", "James Cameron"],
        correctAnswer: 1
    },
    {
        prompt: "Which movie features the character Jack Dawson?",
        choices: ["The Great Gatsby", "Catch Me If You Can", "Titanic", "Inception"],
        correctAnswer: 2
    },
    {
        prompt: "What is the highest-grossing film of all time?",
        choices: ["Avatar", "Titanic", "Avengers: Endgame", "Star Wars: The Force Awakens"],
        correctAnswer: 0
    },
    {
        prompt: "Which film won the Best Picture Oscar in 1994?",
        choices: ["Pulp Fiction", "Forrest Gump", "The Shawshank Redemption", "Jurassic Park"],
        correctAnswer: 1
    },
    {
        prompt: "Who played the Joker in the 2008 movie 'The Dark Knight'?",
        choices: ["Heath Ledger", "Jack Nicholson", "Joaquin Phoenix", "Mark Hamill"],
        correctAnswer: 0
    }
];

// DOM elements
const introElement = document.getElementById("startArea");
const questionElement = document.getElementById("question");
const optionsElements = [
    document.getElementById("answer0"),
    document.getElementById("answer1"),
    document.getElementById("answer2"),
    document.getElementById("answer3")
];
const scoreElement = document.getElementById("points");
const quizContainer = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("value");
const endGameContainer = document.getElementById("endGameDiv");
const originalEndGameHTML = endGameDiv.innerHTML;

const startButton = document.getElementById("startButton"); 
let currentQuestionIndex = 0;
let playerScore = 0;

// Hide game and end game areas initially
endGameContainer.style.display = "none";
quizContainer.style.display = "none";



// Event listener for the start button
startButton.addEventListener('click', startQuiz);

/**
 * Initiates the quiz game, hiding the intro and displaying the quiz area.
 */
function startQuiz() {
    introElement.style.display = "none";
    quizContainer.style.display = "block";
    continueQuiz();
}

/**
 * Updates the displayed score.
 */
function updateScoreDisplay() {
    scoreDisplay.innerText = playerScore.toString();
}


/**
 * Resets the quiz to the beginning.
 */
function resetQuiz() {
    // Reset quiz variables
    currentQuestionIndex = 0;
    playerScore = 0;
    updateScoreDisplay();

    // Reset display elements
    introElement.style.display = "block";
    endGameContainer.style.display = "none";
    quizContainer.style.display = "none";
    endGameDiv.innerHTML = originalEndGameHTML;

    // Optionally reset the text of options and questions
    displayQuestionAndOptions(currentQuestionIndex);
}

/**
 * Loads the question and its options based on the current index.
 */
function displayQuestionAndOptions(index) {
    questionElement.innerText = quizQuestions[index].prompt;
    optionsElements.forEach((element, idx) => {
        element.innerText = quizQuestions[index].choices[idx];
    });
}

/**
 * Validates the player's selected choice and updates the score.
 */
function submitAnswer(selectedChoice) {
    if (selectedChoice === quizQuestions[currentQuestionIndex].correctAnswer) {
        playerScore++;
        updateScoreDisplay();
    }
    currentQuestionIndex++;
    continueQuiz();
}

/**
 * Continues the quiz until all questions are answered, then ends the game.
 */
function continueQuiz() {
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestionAndOptions(currentQuestionIndex);
    } else {
        concludeQuiz();
    }
}

function concludeQuiz() {
    scoreElement.innerText = playerScore.toString(); // Ensure score is updated
    quizContainer.style.display = "none";
    endGameContainer.style.display = "block";

    // Update the endGameDiv content correctly every time
    endGameDiv.innerHTML = `<p>Awesome work! The quiz is complete, and you did an impressive job.</p>
                            <p>Your score: <span id="points">${playerScore}</span></p>
                            <button onclick="window.location.reload();">Play Again</button>
                            <button onclick="byeBye();">Exit</button>`;
}

/** Displaying goodbye message */
function byeBye() {
    introElement.style.display = "none";
    quizContainer.style.display = "none";
    endGameContainer.style.display = "block";
    const endGameDiv = document.getElementById("endGameDiv");
    endGameDiv.innerHTML = '<h1>Thank you for playing!</h1><p>We hope you enjoyed the quiz. Goodbye and we hope to see you again soon!</p>';
}