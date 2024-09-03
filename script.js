const gridSize = 10;
let player1Position = { x: 0, y: 0 };
let player2Position = { x: 9, y: 9 };
let player1Score = 0;
let player2Score = 0;
let gameInterval;
let gameTime;

const grid = document.getElementById('game-container');
const score1Elem = document.getElementById('score1');
const score2Elem = document.getElementById('score2');

function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
    }
}

function updateCell(x, y, color) {
    const index = y * gridSize + x;
    const cell = grid.children[index];
    if (cell.classList.contains('cell')) {
        if (color === 'red') {

            if (cell.classList.contains('red')) {

            }
            else if (cell.classList.contains('blue')) {
                player2Score--;
                player1Score++;
                cell.classList.remove('blue');
                cell.classList.add('red');
                score1Elem.textContent = player1Score;
                score2Elem.textContent = player2Score;
            }
            else {
                cell.classList.add('red');
                player1Score++;
                score1Elem.textContent = player1Score;
            }

        } else if (color === 'blue') {

            if (cell.classList.contains('blue')) {

            }
            else if (cell.classList.contains('red')) {
                player2Score++;
                player1Score--;

                cell.classList.remove('red');
                cell.classList.add('blue');

                score1Elem.textContent = player1Score;
                score2Elem.textContent = player2Score;
            }
            else {
                cell.classList.add('blue');
                player2Score++;
                score2Elem.textContent = player2Score;
            }
        }
    }
}

function movePlayer1(direction) {
    switch (direction) {
        case 'W': if (player1Position.y > 0) player1Position.y--; break;
        case 'S': if (player1Position.y < gridSize - 1) player1Position.y++; break;
        case 'A': if (player1Position.x > 0) player1Position.x--; break;
        case 'D': if (player1Position.x < gridSize - 1) player1Position.x++; break;

        case 'w': if (player1Position.y > 0) player1Position.y--; break;
        case 's': if (player1Position.y < gridSize - 1) player1Position.y++; break;
        case 'a': if (player1Position.x > 0) player1Position.x--; break;
        case 'd': if (player1Position.x < gridSize - 1) player1Position.x++; break;
    }
    updateCell(player1Position.x, player1Position.y, 'red');
}

function movePlayer2(direction) {
    switch (direction) {
        case 'ArrowUp': if (player2Position.y > 0) player2Position.y--; break;
        case 'ArrowDown': if (player2Position.y < gridSize - 1) player2Position.y++; break;
        case 'ArrowLeft': if (player2Position.x > 0) player2Position.x--; break;
        case 'ArrowRight': if (player2Position.x < gridSize - 1) player2Position.x++; break;
    }
    updateCell(player2Position.x, player2Position.y, 'blue');
}

function startGame() {
    clearInterval(gameInterval);
    gameTime = parseInt(document.getElementById('time').value) * 1000;
    const endTime = Date.now() + gameTime;

    gameInterval = setInterval(() => {
        const timeLeft = endTime - Date.now();
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            alert('¡El tiempo ha terminado!');
            
        }
    }, 1000);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'W' || e.key === 'S' || e.key === 'A' || e.key === 'D') {
        movePlayer1(e.key);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        movePlayer2(e.key);
    }
});

document.getElementById('start-button').addEventListener('click', startGame);

createGrid();
