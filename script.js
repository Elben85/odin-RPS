const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;
const DRAW = 0;
const COMPUTER_WIN = 1;
const PLAYER_WIN = 2;

function computerPlay() {
    return Math.floor(3 * Math.random());
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return DRAW;
    } else if (playerSelection === ROCK) {
        return computerSelection === PAPER ? COMPUTER_WIN : PLAYER_WIN;
    } else if (playerSelection === PAPER) {
        return computerSelection === SCISSORS ? COMPUTER_WIN : PLAYER_WIN;
    } else {
        return computerSelection === ROCK ? COMPUTER_WIN : PLAYER_WIN;
    }
}

function getResultText(result) {
    if (result === DRAW) {
        return "Draw, try again";
    } else if (result === COMPUTER_WIN) {
        return "Computer won the round";
    } else {
        return "You won the round";
    }
}

function getDisplayedComputerMove(move) {
    if (move === ROCK) {
        return "rock";
    } else if (move === PAPER) {
        return "paper";
    } else {
        return "scissors"
    }
}

function isGameOver() {
    return playerLife === 0 || computerLife === 0;
}

function deductLife(result) {
    if (result === COMPUTER_WIN) {
        playerLife--;
        playerLifePanel.textContent = `: ${playerLife}`;
    } else if (result === PLAYER_WIN) {
        computerLife--;
        compLifePanel.textContent = `: ${computerLife}`;
    }
}

let playerLife = 5;
let computerLife = 5;
const rockImg = document.getElementsByClassName("rock")[0];
const paperImg = document.getElementsByClassName("paper")[0];
const scissorsImg = document.getElementsByClassName("scissors")[0];
const playerLifePanel = document.getElementById("your_life");
const compLifePanel = document.getElementById("comp_life");
const compMoveImgPanel = document.getElementById("comp_play");
const compMoveCommentPanel = document.getElementsByClassName("comp_move")[0];
const roundResultPanel = document.getElementById("result");
const afterGamePanel = document.getElementsByClassName("end_game")[0];

playerLifePanel.textContent = `: ${playerLife}`;
compLifePanel.textContent = `: ${computerLife}`;

function reset() {
    playerLife = 5;
    computerLife = 5;
    playerLifePanel.textContent = `: ${playerLife}`;
    compLifePanel.textContent = `: ${computerLife}`;
    compMoveCommentPanel.textContent = "";
    roundResultPanel.textContent = "Choose your move by clicking one of the images above";
    compMoveImgPanel.removeAttribute("src");
    document.getElementsByClassName("game_result")[0].remove();
    document.getElementsByClassName("temp")[0].remove();
}

function handleNextRound(playerSelection) {
    if (isGameOver()) {
        return;
    }
    const compMove = computerPlay();
    const result = playRound(playerSelection, compMove);
    const displayedComputerMove = getDisplayedComputerMove(compMove);

    compMoveCommentPanel.textContent = "Computer chose " + displayedComputerMove;
    compMoveImgPanel.src = "image/" + displayedComputerMove + ".jpg";
    roundResultPanel.textContent = getResultText(result);
    deductLife(result);

    if (playerLife === 0) {
        const resultCommentPanel = document.createElement("div");
        resultCommentPanel.textContent = "Imagine losing to a computer";
        resultCommentPanel.className = "game_result";
        afterGamePanel.appendChild(resultCommentPanel);

        const retryButton = document.createElement("button");
        retryButton.textContent = "Play Again";
        retryButton.addEventListener("click", reset);
        retryButton.className = "temp";
        afterGamePanel.appendChild(retryButton);
    } else if (computerLife === 0) {
        const resultCommentPanel = document.createElement("div");
        resultCommentPanel.textContent = "Congrats, You won the game";
        resultCommentPanel.className = "game_result";
        afterGamePanel.appendChild(resultCommentPanel);

        const retryButton = document.createElement("button");
        retryButton.textContent = "Play Again";
        retryButton.addEventListener("click", reset);
        retryButton.className = "temp";
        afterGamePanel.appendChild(retryButton);
    }

}

rockImg.addEventListener("click", () => handleNextRound(ROCK));
paperImg.addEventListener("click", () => handleNextRound(PAPER));
scissorsImg.addEventListener("click", () => handleNextRound(SCISSORS));
