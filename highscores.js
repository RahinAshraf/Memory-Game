function saveScore(timeTaken) {
    let scores = JSON.parse(localStorage.getItem('highScores')) || [];
    scores.push(timeTaken);
    localStorage.setItem('highScores', JSON.stringify(scores));
}

function displayScores() {
    const scores = JSON.parse(localStorage.getItem('highScores')) || [];
    const scoresContainer = document.getElementById('high-scores');
    scoresContainer.innerHTML = scores
        .sort((a, b) => a - b)
        .map(score => `<li>${score} seconds</li>`)
        .join('');
}

document.addEventListener('DOMContentLoaded', displayScores);
