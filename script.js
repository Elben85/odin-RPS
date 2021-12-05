function computerPlay() {
    let num = 3 * Math.random();

    if (num < 1) {
        return "rock";
    } else if (num < 2) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(playerSelection, ComputerSelection) {
    if (playerSelection === ComputerSelection) {
        return "Draw, try again";
    } else if (playerSelection === "rock") {
        return ComputerSelection === "paper" ? "Computer won the round" : "You won the round";
    } else if (playerSelection === "paper") {
        return ComputerSelection === "scissors" ? "Computer won the round" : "You won the round";
    } else if (playerSelection === "scissors") {
        return ComputerSelection === "rock" ? "Computer won the round" : "You won the round";
    } else {
        return "Inelligible Input";
    }
}

function check_life() {
    return player_life !== 0 && computer_life !== 0;
}

let player_life = 5;
let computer_life = 5;
const rock = document.getElementsByClassName("rock")[0];
const paper = document.getElementsByClassName("paper")[0];
const scissors = document.getElementsByClassName("scissors")[0];
const showPlayerLife = document.getElementById("your_life");
const showCompLife = document.getElementById("comp_life");
const showCompPlay = document.getElementById("comp_play");
const showCompMove = document.getElementsByClassName("comp_move")[0];
const showResult = document.getElementById("result");
showPlayerLife.textContent = `: ${player_life}`;
showCompLife.textContent = `: ${computer_life}`;

function round(playerSelection) {
    if (check_life()) {
        const comp_move = computerPlay();
        const result = playRound(playerSelection, comp_move);

        if(comp_move === "rock"){
            showCompPlay.src = "image/rock.jpg";
        } else if (comp_move === "paper"){
            showCompPlay.src = "image/paper.jpg";
        } else{
            showCompPlay.src = "image/scissors.jpg"
        }

        showCompMove.textContent = `Computer chose ${comp_move}`;  

        showResult.textContent = result;
        if (result === "Computer won the round") {
            player_life--;
            showPlayerLife.textContent = `: ${player_life}`;
        } else if (result === "You won the round") {
            computer_life--;
            showCompLife.textContent = `: ${computer_life}`;
        }
    }
}

rock.addEventListener('click', () => round("rock"));
paper.addEventListener('click', () => round("paper"));
scissors.addEventListener('click', () => round("scissors"));