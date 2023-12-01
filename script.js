const gameInfo = document.querySelector('.gameInfo');
const boxes = document.querySelectorAll('.box');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initialize() {
    currentPlayer = 'X';
    gameGrid = ["", "", "", "", "", "", "", "", ""]
    gameInfo.textContent = `Current Player: ${currentPlayer}`;
    
    // for ui
    boxes.forEach((box,index) => {
        box.textContent = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    
    newGameBtn.classList.remove("active");
}
initialize();

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].style.pointerEvents = "none";
        boxes[index].textContent = currentPlayer;
        gameGrid[index] = currentPlayer;
        swapTurns();
        checkGameOver();
    }
}

function swapTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.textContent = `Current Player : ${currentPlayer}`;
}

function checkGameOver() {
    let winner = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            // winner got so we blocked clck pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            winner = gameGrid[position[0]] === "X" ? "X" : "O";

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if (winner !== "") {
        gameInfo.textContent = `Winner is - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    // to check tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.textContent = " !!! Game Tied !!!";
        newGameBtn.classList.add("active");
    }
}

newGameBtn.addEventListener('click', initialize);