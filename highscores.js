// Function to save a score to localStorage
function saveScore(timeTaken) {
    if (typeof timeTaken !== 'number' || timeTaken < 0) {
        console.error('Invalid score. Time taken must be a positive number.');
        return;
    }

    let scores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // Only keep the top 10 scores
    if (scores.length >= 10) {
        scores.sort((a, b) => a - b); // Sort scores in ascending order
        if (timeTaken < scores[scores.length - 1]) {
            scores.pop(); // Remove the lowest score if the new score is better
        } else {
            console.log('Score not high enough to be saved.');
            return;
        }
    }

    scores.push(timeTaken);
    localStorage.setItem('highScores', JSON.stringify(scores));
    console.log(`Score of ${timeTaken} seconds saved successfully.`);
}

// Function to display high scores
function displayScores() {
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];
    const scoresContainer = document.getElementById('high-scores');
    
    // Clear previous scores
    scoresContainer.innerHTML = '';
    
    if (scores.length === 0) {
        scoresContainer.innerHTML = '<li>No scores yet.</li>';
        return;
    }

    scores
        .sort((a, b) => a - b)
        .forEach((score, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${score} seconds`;
            scoresContainer.appendChild(listItem);
        });
}

// Function to clear all scores
function clearScores() {
    localStorage.removeItem('highScores');
    displayScores();
    console.log('All scores cleared successfully.');
}

// Add event listener for the clear scores button
document.getElementById('clear-scores-button').addEventListener('click', clearScores);

// Automatically display scores when the page loads
document.addEventListener('DOMContentLoaded', displayScores);

// Function to prompt the user for a new score and save it
function promptForScore() {
    const timeTaken = prompt("Enter your time taken in seconds:");
    const parsedTime = parseFloat(timeTaken);
    
    if (!isNaN(parsedTime) && parsedTime >= 0) {
        saveScore(parsedTime);
        displayScores();
    } else {
        console.error('Invalid input. Please enter a positive number.');
    }
}

// Add event listener for a button to prompt for a new score
document.getElementById('add-score-button').addEventListener('click', promptForScore);
