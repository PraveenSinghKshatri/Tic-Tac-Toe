const Gameboard = (() => {
    const board = Array(9).fill(null);

    const getBoard = () => board;
    const setCell = (index, value) => board[index] = value;
    const resetBoard = () => board.fill(null);

    return { getBoard, setCell, resetBoard };
})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
};

const Game = (() => {
    let currentPlayer;
    let playerX;
    let playerO;

    const initializeGame = (playerXName, playerOName) => {
        playerX = Player(playerXName, 'X');
        playerO = Player(playerOName, 'O');
        currentPlayer = playerX;
        Gameboard.resetBoard();
        updateDisplay();
    };

    const checkWin = () => {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some(combination => 
            combination.every(index => board[index] === currentPlayer.getMarker())
        );
    };

    const checkDraw = () => {
        return Gameboard.getBoard().every(cell => cell !== null);
    };

    const makeMove = (index) => {
        if (Gameboard.getBoard()[index] === null) {
            Gameboard.setCell(index, currentPlayer.getMarker());
            if (checkWin()) {
                updateDisplay(`${currentPlayer.getName()} Wins!🎉`);
            } else if (checkDraw()) {
                updateDisplay(`It's a Draw!`);
            } else {
                currentPlayer = currentPlayer === playerX ? playerO : playerX;
                updateDisplay(`${currentPlayer.getName()}'s Turn`);
            }
        }
    };

    const updateDisplay = (message = `${currentPlayer.getName()}'s Turn`) => {
        document.getElementById('message').textContent = message;
        renderBoard();
    };

    const renderBoard = () => {
        const cells = document.querySelectorAll('.cell');
        Gameboard.getBoard().forEach((cell, index) => {
            cells[index].textContent = cell;
        });
    };

    return { initializeGame, makeMove };
})();

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const startButton = document.getElementById('start-game');
    const resetButton = document.getElementById('reset-game');

    // Create the grid dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', () => {
            const index = i;
            Game.makeMove(index);
        });
        grid.appendChild(cell);
    }

    startButton.addEventListener('click', () => {
        const playerXName = document.getElementById('player-x').value;
        const playerOName = document.getElementById('player-o').value;
        if (playerXName && playerOName) {
            Game.initializeGame(playerXName, playerOName);
        } else {
            document.getElementById('message').textContent = 'Please enter both player names!';
        }
    });

    resetButton.addEventListener('click', () => {
        Game.initializeGame(
            document.getElementById('player-x').value,
            document.getElementById('player-o').value
        );
    });
});

 // JavaScript to display the range of years in the copyright notice
 const copyrightYearElement = document.getElementById('copyright-year');
 const startYear = 2024;
 const currentYear = new Date().getFullYear();
 const yearRange = (startYear === currentYear) ? currentYear : `${startYear} - ${currentYear}`;
 copyrightYearElement.textContent = yearRange;