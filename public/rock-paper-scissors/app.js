const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const yourScore = document.querySelector("[data-your-score]");
const computerScore = document.querySelector("[data-computer-score]");
const SELECTIONS = [
  {
    name: "rock",
    img: "images/rock.png",
    beats: "scissors",
  },
  {
    name: "paper",
    img: "images/paper.png",
    beats: "rock",
  },
  {
    name: "scissors",
    img: "images/scissors.png",
    beats: "paper",
  },
];
selectionButtons.forEach((selBtn) => {
  selBtn.addEventListener("click", (e) => {
    const selectionName = selBtn.dataset.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    );
    makeSelection(selection);
  });
});

function incrementScore(score) {
  score.innerText = parseInt(score.innerText) + 1;
}
function makeSelection(selection) {
  const computerSelection = randomSelection();
  const yourWinner = whoWin(selection, computerSelection);
  const computerWinner = whoWin(computerSelection, selection);
  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);
  if (yourWinner) incrementScore(yourScore);
  if (computerWinner) incrementScore(computerScore);
}

function addSelectionResult(selection, winner) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = selection.img;
  div.classList.add("result-sel");
  if (winner) {
    div.classList.add("winner");
  }
  div.appendChild(img);
  return finalColumn.after(div);
}
function whoWin(selection, opponent) {
  return selection.beats === opponent.name;
}
function randomSelection() {
  const randomSelection = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomSelection];
}
