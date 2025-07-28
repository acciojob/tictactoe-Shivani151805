//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");
const gameDiv = document.querySelector(".game");
const formDiv = document.querySelector(".form");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "", player2 = "";
let currentPlayer = "", currentSymbol = "";
let board = Array(9).fill("");
let isGameOver = false;

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players!");
    return;
  }

  formDiv.classList.add("hidden");
  gameDiv.classList.remove("hidden");

  currentPlayer = player1;
  currentSymbol = "X";
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (isGameOver) return;

    const index = parseInt(cell.id) - 1;

    if (board[index] !== "") return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWin()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      isGameOver = true;
      highlightWinningCells();
      return;
    }

    // Check for draw
    if (!board.includes("")) {
      messageDiv.textContent = "It's a draw!";
      isGameOver = true;
      return;
    }

    // Switch turns
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "O";
    } else {
      currentPlayer = player1;
      currentSymbol = "X";
    }

    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Cols
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  return winCombinations.some(combination => {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Store winning combo for coloring
      document.getElementById((a+1).toString()).classList.add("winner");
      document.getElementById((b+1).toString()).classList.add("winner");
      document.getElementById((c+1).toString()).classList.add("winner");
      return true;
    }
    return false;
  });
}

function highlightWinningCells() {
  // Already applied via class "winner"
}
