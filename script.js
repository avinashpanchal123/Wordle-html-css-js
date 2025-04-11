const word = "apple"; 
let currentRow = 0;
let currentCol = 0;
let grid = document.getElementById("grid");
let boxes = document.querySelectorAll(".box");

document.addEventListener("keydown", handleKey);

function handleKey(e) {
  if (currentRow >= 6) return;

  if (e.key === "Backspace") {
    if (currentCol > 0) {
      currentCol--;
      updateBox("", false);
    }
  } else if (e.key === "Enter") {
    if (currentCol === 5) {
      checkWord();
    }
  } else if (/^[a-zA-Z]$/.test(e.key)) {
    if (currentCol < 5) {
      updateBox(e.key, true);
      currentCol++;
    }
  }
}

function updateBox(letter, add) {
  let index = currentRow * 5 + currentCol;
  boxes[index].textContent = letter.toUpperCase();
}

function checkWord() {
  let guess = "";
  for (let i = 0; i < 5; i++) {
    const box = boxes[currentRow * 5 + i];
    const letter = box.textContent.toLowerCase();
    guess += letter;

    if (letter === word[i]) {
      box.classList.add("correct");
    } else if (word.includes(letter)) {
      box.classList.add("present");
    } else {
      box.classList.add("absent");
    }
  }

  if (guess === word) {
    alert("Congratulations!");
    document.removeEventListener("keydown", handleKey);
  }

  currentRow++;
  currentCol = 0;
}
