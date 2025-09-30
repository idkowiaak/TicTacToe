const message = document.querySelector("#msg");
const messagecontainer = document.querySelector(".hide-message-container");
const boxes = document.querySelectorAll(".box");
const resetbtn = document.querySelector(".reset-game-btn");
let turnO = true; // player O Starts

const winpatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.disabled) return;

    if (turnO) {
      box.innerText = "O";
      box.style.color = " #00d4ff";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#ff2e63";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  message.innerText = `Congratulations, Winner is ${winner}!`;
  messagecontainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winpatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }

  const isDraw = Array.from(boxes).every((box) => box.innerText !== "");
  if (isDraw) {
    message.innerText = "Match Drawn!";
    messagecontainer.classList.remove("hide");
    return true;
  }
  return false;
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  messagecontainer.classList.add("hide");
};

resetbtn.addEventListener("click", resetGame);

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});
