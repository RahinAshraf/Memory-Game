const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

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

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedCards += 2;
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    if (matchedCards === cardValues.length) {
        alert('You win!');
    }
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.getElementById('restart-button').addEventListener('click', function() {
    document.getElementById('game-container').innerHTML = '';
    matchedCards = 0;
    createBoard();
});

createBoard();
