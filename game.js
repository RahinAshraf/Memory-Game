const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;
let score = 0;
let timer;
let timeElapsed = 0;

// Create a timer display element
const timerDisplay = document.createElement('div');
timerDisplay.id = 'timer';
timerDisplay.textContent = 'Time: 0s';
document.getElementById('game-container').appendChild(timerDisplay);

// Create a score display element
const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'score';
scoreDisplay.textContent = 'Score: 0';
document.getElementById('game-container').appendChild(scoreDisplay);

// Function to create the game board
function createBoard() {
    const shuffledCards = cardValues.sort(() => 0.5 - Math.random());
    const gameContainer = document.getElementById('game-container');

    for (let value of shuffledCards) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    }
}

// Function to flip a card
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }
}

// Function to check if two flipped cards match
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards += 2;
        score += 10;  // Increase score for a match
        scoreDisplay.textContent = `Score: ${score}`;
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    // Check if all cards have been matched
    if (matchedCards === cardValues.length) {
        clearInterval(timer); // Stop the timer
        alert(`You win! Your score is: ${score}`);
    }
}

// Function to reset the board state
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Function to restart the game
function restartGame() {
    matchedCards = 0;
    score = 0; // Reset score
    scoreDisplay.textContent = 'Score: 0'; // Update score display
    timeElapsed = 0; // Reset timer
    timerDisplay.textContent = 'Time: 0s'; // Update timer display

    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Clear the game board
    createBoard(); // Create a new game board
    startTimer(); // Start the timer
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        timerDisplay.textContent = `Time: ${timeElapsed}s`;
    }, 1000);
}

// Add event listener to the restart button
document.getElementById('restart-button').addEventListener('click', restartGame);

// Initialize the game
createBoard();
startTimer(); // Start the timer on game initialization

// Sound effects for match and mismatch
const matchSound = new Audio('match.mp3');
const mismatchSound = new Audio('mismatch.mp3');

// Enhanced checkForMatch function with sound effects
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchSound.play(); // Play match sound
        matchedCards += 2;
        score += 10;  // Increase score for a match
        scoreDisplay.textContent = `Score: ${score}`;
        resetBoard();
    } else {
        mismatchSound.play(); // Play mismatch sound
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    // Check if all cards have been matched
    if (matchedCards === cardValues.length) {
        clearInterval(timer); // Stop the timer
        alert(`You win! Your score is: ${score}`);
    }
}

// Function to customize card values
function customizeCardValues(newCardValues) {
    if (Array.isArray(newCardValues) && newCardValues.length % 2 === 0) {
        cardValues.length = 0; // Clear the existing array
        cardValues.push(...newCardValues); // Add new card values
        restartGame(); // Restart the game to apply new values
    } else {
        console.error('Invalid card values. Please provide an even-length array.');
    }
}

// Example usage: customize the card values
// customizeCardValues(['E', 'E', 'F', 'F', 'G', 'G', 'H', 'H']); // Call this function to change the card values

// Handle window resizing for responsive design
window.addEventListener('resize', () => {
    const cards = document.querySelectorAll('.card');
    const cardSize = Math.min(window.innerWidth / 4, 150); // Adjust based on window size
    cards.forEach(card => {
        card.style.width = `${cardSize}px`;
        card.style.height = `${cardSize}px`;
    });
});

// Initial setup for card sizes
window.dispatchEvent(new Event('resize'));
