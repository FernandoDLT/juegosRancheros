let CLASS_X = "x";
let CLASS_CIRCLE = "circle";
let currentTurn;
const WINNININGBORD = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [0, 4, 8],
  [2, 5, 8],
  [2, 4, 6],
];
const cellElement = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningSmgElement = document.getElementById("winningMsg");
const restartButton = document.getElementById("restartBtn");
const winningSmg = document.querySelector("[data-winning-msg]");
startGame();

restartBtn.addEventListener("click", startGame);
function startGame() {
  currentTurn = false;
  cellElement.forEach((cell) => {
    cell.classList.remove(CLASS_X);
    cell.classList.remove(CLASS_CIRCLE);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningSmgElement.classList.remove("show");
}
//test
function handleClick(event) {
  let cell = event.target;
  let currentClass = currentTurn ? CLASS_CIRCLE : CLASS_X;
  placeMarker(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningSmg.innerHTML = "Drawing";
  } else {
    winningSmg.innerHTML = `${currentTurn ? "O's" : "X's"} win's  `;
  }
  winningSmgElement.classList.add("show");
}
function placeMarker(cell, currentClass) {
  cell.classList.add(currentClass);
}
function isDraw() {
  return [...cellElement].every((cell) => {
    return (
      cell.classList.contains(CLASS_X) || cell.classList.contains(CLASS_CIRCLE)
    );
  });
}
function swapTurns() {
  currentTurn = !currentTurn;
}
function setBoardHoverClass() {
  board.classList.remove(CLASS_X);
  board.classList.remove(CLASS_CIRCLE);
  if (currentTurn) {
    board.classList.add(CLASS_CIRCLE);
  } else {
    board.classList.add(CLASS_X);
  }
}

function checkWin(currentClass) {
  return WINNININGBORD.some((comb) => {
    return comb.every((idx) =>
      cellElement[idx].classList.contains(currentClass)
    );
  });
}
