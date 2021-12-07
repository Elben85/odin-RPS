const rock = 0;
const paper = 1;
const scissors = 2;
const draw = 0;
const computerWin = 1;
const playerWin = 2;

function computerPlay() {
    return Math.floor(3 * Math.random());
}

function playRound(playerSelection, computerSelection) {
    const difference = computerSelection - playerSelection;
    return difference - Math.floor(difference / 3) * 3;
}

function getResultText(result) {
    if (result === draw) {
        return "Draw, try again";
    } else if (result === computerWin) {
        return "Computer won the round";
    } else {
        return "You won the round";
    }
}

function getComputerMove(move) {
    if (move === rock) {
        return "rock";
    } else if (move === paper) {
        return "paper";
    } else {
        return "scissors"
    }
}

function isGameOver() {
    return playerLife === 0 || computerLife === 0;
}

let playerLife = 5;
let computerLife = 5;
const rockImg = document.getElementsByClassName("rock")[0];
const paperImg = document.getElementsByClassName("paper")[0];
const scissorsImg = document.getElementsByClassName("scissors")[0];
const showPlayerLife = document.getElementById("your_life");
const showCompLife = document.getElementById("comp_life");
const showCompPlay = document.getElementById("comp_play");
const showCompMove = document.getElementsByClassName("comp_move")[0];
const showResult = document.getElementById("result");
const showAfterGame = document.getElementsByClassName("end_game")[0];

showPlayerLife.textContent = `: ${playerLife}`;
showCompLife.textContent = `: ${computerLife}`;

function reset() {
    playerLife = 5;
    computerLife = 5;
    showPlayerLife.textContent = `: ${playerLife}`;
    showCompLife.textContent = `: ${computerLife}`;
    showCompMove.textContent = "";
    showResult.textContent = "Choose your move by clicking one of the images above";
    showCompPlay.removeAttribute("src");
    document.getElementsByClassName("game_result")[0].remove();
    document.getElementsByClassName("temp")[0].remove();
}

function round(playerSelection) {
    if (isGameOver()) {
        return;
    }
    const compMove = computerPlay();
    const result = playRound(playerSelection, compMove);

    showCompMove.textContent = "Computer chose " + getComputerMove(compMove);
    showCompPlay.src = "image/" + getComputerMove(compMove) + ".jpg";
    showResult.textContent = getResultText(result);

    if (result === computerWin) {
        playerLife--;
        showPlayerLife.textContent = `: ${playerLife}`;
    } else if (result === playerWin) {
        computerLife--;
        showCompLife.textContent = `: ${computerLife}`;
    }

    if (playerLife === 0) {
        const temp1 = document.createElement("div");
        temp1.textContent = "Imagine losing to a computer";
        temp1.className = "game_result";
        showAfterGame.appendChild(temp1);

        const temp2 = document.createElement("button");
        temp2.textContent = "Play Again";
        temp2.addEventListener("click", reset);
        temp2.className = "temp";
        showAfterGame.appendChild(temp2);
    } else if (computerLife === 0) {
        const temp1 = document.createElement("div");
        temp1.textContent = "Congrats, You won the game";
        temp1.className = "game_result";
        showAfterGame.appendChild(temp1);

        const temp2 = document.createElement("button");
        temp2.textContent = "Play Again";
        temp2.addEventListener("click", reset);
        temp2.className = "temp";
        showAfterGame.appendChild(temp2);
    }

}

rockImg.addEventListener("click", () => round(rock));
paperImg.addEventListener("click", () => round(paper));
scissorsImg.addEventListener("click", () => round(scissors));
