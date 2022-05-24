const CHOICES = ["Rock", "Paper", "Scissors"];

const player = {
  name: "Player",
  choice: null,
  score: 0,
  scoreNode: document.querySelector('.player-score')
};

const computer = {
  name: "Computer",
  choice: null,
  score: 0,
  scoreNode: document.querySelector('.computer-score')
};

document.querySelectorAll('.choice-container button').forEach(btn => {
  btn.addEventListener(
    'click', 
    () => {
      main(btn.dataset.choice);
      btn.classList.add('clicked');
    }
  );
  btn.addEventListener(
    'transitionend',
    removeTransition
  );
})

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('clicked');
}

document.querySelector('.reset-btn').addEventListener('click', () => resetGame());

function main(pChoice) {
  computerMakeChoice();
  playerMakeChoice(pChoice);
  const winner = playRound();
  showResult(winner);
  updateScore();
  resetChoices();
  checkEndGame();
}

function checkEndGame() {
  if (player.score >= 5 || computer.score >= 5) {3
    const winner = player.score >= 5 ? player : computer;
    const msg = document.querySelector('.message');
    msg.textContent = `Winner: ${winner.name}`;
    document.querySelectorAll('.choice-container button').forEach(
      btn => btn.disabled = true
    );
    document.querySelector('.reset-btn').style.visibility = 'visible';
  }
}

function computerMakeChoice() {
  computer.choice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function playerMakeChoice(choice) {
  if (CHOICES.includes(choice)) {
    player.choice = choice;
  }
}

function playRound() {
  if (
    player.choice === "Rock" && computer.choice === "Scissors" ||
    player.choice === "Scissors" && computer.choice === "Paper" ||
    player.choice === "Paper" && computer.choice === "Rock"
  ) {
    player.score++;
    return player;
  } else if (player.choice === computer.choice) {
    return null;
  } else { 
    computer.score++; 
    return computer;
  }
}

function showResult(winner) {
  const msg = document.querySelector('.message');
  if (winner != null) {
    let loser;
    if (winner == player) {
      loser = computer;
    } else if (winner == computer) {
      loser = player;
    }
    msg.textContent = `${winner.name} wins! ${winner.choice} beats ${loser.choice}.`
  } else {
    msg.textContent = "Tie!"
  }
}

function updateScore() {
  player.scoreNode.textContent = `Player: ${player.score}`;
  computer.scoreNode.textContent = `Computer: ${computer.score}`;
}

function resetChoices() {
  player.choice = null;
  computer.choice = null;
}

function resetGame() {
  resetChoices();
  player.score = 0;
  computer.score = 0;
  document.querySelector('.reset-btn').style.visibility = 'hidden';
  updateScore();
  document.querySelectorAll('.choice-container button').forEach(
    btn => btn.disabled = false
  );
  document.querySelector('.message').textContent = "Game reset!";
}