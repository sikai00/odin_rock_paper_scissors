const CHOICES = ["Rock", "Paper", "Scissors"];

function computerPlay() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function toTitleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function playRound(playerSelection, computerSelection) {
  playerSelection = toTitleCase(playerSelection);
  let result;
  if (
    playerSelection === "Rock" && computerSelection === "Scissors" ||
    playerSelection === "Scissors" && computerSelection === "Paper" ||
    playerSelection === "Paper" && computerSelection === "Rock") {
    result = "Player"; 
  } else if (playerSelection === computerSelection) {
    result = "Tie";
  } else { 
    result = "Computer";
  }

  let message;
  if (result === "Tie") {
    message = "Tie! No one wins this round.";
  } else {
    winningHand = result === "Player" ? playerSelection : computerSelection;
    losingHand = result === "Player" ? computerSelection : playerSelection;

    message = `${result} wins this round! ${winningHand} beats ${losingHand}.`;
  }

  console.log(message);
  return result;
}

function game() {
  let playerScore = 0, computerScore = 0;

  for (let i = 0; i < 5; i++) {
    const result = playRound(prompt("Choose!"), computerPlay());
    if (result === "Player") {
      playerScore++;
    } else if (result === "Computer") {
      computerScore++;
    }
  }

  const overallWinner = 
    playerScore > computerScore 
      ? "Player" 
      : playerScore < computerScore
        ? "Computer"
        : "Tie";

  if (overallWinner !== "Tie") {
    console.log(`Winner is ${toTitleCase(overallWinner)}!`);
  } else {
    console.log("Tie!");
  }
}

game();