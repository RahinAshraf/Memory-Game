let timer;
let seconds = 0;

function startTimer() {
    seconds = 0;
    timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = seconds + ' seconds';
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    stopTimer();
    document.getElementById('timer').textContent = '0 seconds';
}

document.getElementById('restart-button').addEventListener('click', () => {
    resetTimer();
    startTimer();
});
