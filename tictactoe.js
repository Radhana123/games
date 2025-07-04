const boxes = document.querySelectorAll(".box");
    const resetBtn = document.getElementById("resetBtn");
    const newGameBtn = document.getElementById("Restart");
    const msgContainer = document.querySelector(".msg");
    const msg = document.getElementById("msg1");
    const gameMode = document.getElementById("gameMode");
    const difficulty = document.getElementById("difficulty");

    let turnO = true;
    let gameOver = false;
    let mode = "pvp";
    let level = "easy";

    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    gameMode.addEventListener("change", () => {
      mode = gameMode.value;
      resetGame();
    });

    difficulty.addEventListener("change", () => {
      level = difficulty.value;
      resetGame();
    });

    boxes.forEach((box, index) => {
      box.addEventListener("click", () => {
        if (box.innerText || gameOver) return;
        if (mode === "pvp") handlePlayerMove(box);
        else if (mode === "pvc") {
          handlePlayerMove(box);
          setTimeout(handleComputerMove, 300);
        }
      });
    });

    function handlePlayerMove(box) {
      if (turnO) {
        box.innerText = "O";
        box.classList.add("o");
      } else {
        box.innerText = "X";
        box.classList.add("x");
      }
      box.disabled = true;
      checkWinner();
      turnO = !turnO;
    }

    function handleComputerMove() {
      if (gameOver || turnO) return;
      let move;
      if (level === "easy") move = getRandomMove();
      else if (level === "medium") move = getMediumMove();
      else move = getBestMove();
      if (move !== -1) {
        boxes[move].innerText = "X";
        boxes[move].classList.add("x");
        boxes[move].disabled = true;
        checkWinner();
        turnO = true;
      }
    }

    function getRandomMove() {
      const empty = Array.from(boxes).map((b, i) => b.innerText === "" ? i : null).filter(i => i !== null);
      return empty.length ? empty[Math.floor(Math.random() * empty.length)] : -1;
    }

    function getMediumMove() {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        let emptyCount = values.filter(v => v === "").length;
        if (values.filter(v => v === "O").length === 2 && emptyCount === 1)
          return pattern[values.indexOf("")];
      }
      return getRandomMove();
    }
 
    function getBestMove() {
      let bestScore = -Infinity;
      let move = -1;
      boxes.forEach((box, i) => {
        if (!box.innerText) {
          box.innerText = "X";
          let score = minimax(0, false);
          box.innerText = "";
          if (score > bestScore) {
            bestScore = score;
            move = i;
          }
        }
      });
      return move;
    }

    const scores = { X: 10, O: -10, tie: 0 };

    function minimax(depth, isMaximizing) {
      let result = evaluateWinner();
      if (result !== null) return scores[result];

      if (isMaximizing) {
        let best = -Infinity;
        boxes.forEach((box, i) => {
          if (!box.innerText) {
            box.innerText = "X";
            best = Math.max(best, minimax(depth + 1, false));
            box.innerText = "";
          }
        });
        return best;
      } else {
        let best = Infinity;
        boxes.forEach((box, i) => {
          if (!box.innerText) {
            box.innerText = "O";
            best = Math.min(best, minimax(depth + 1, true));
            box.innerText = "";
          }
        });
        return best;
      }
    }

    function evaluateWinner() {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[b].innerText === boxes[c].innerText) {
          return boxes[a].innerText;
        }
      }
      if ([...boxes].every(b => b.innerText)) return "tie";
      return null;
    }

    function checkWinner() {
      let winner = evaluateWinner();
      if (winner && winner !== "tie") {
        showWinner(winner);
      } else if (winner === "tie") {
        msg.innerText = "😐 It's a Draw!";
        msgContainer.classList.remove("hide");
        gameOver = true;
      }
    }

    function showWinner(winner) {
      msg.innerText = `🎉 Winner is ${winner}`;
      msgContainer.classList.remove("hide");
      gameOver = true;
    }

    function resetGame() {
      turnO = true;
      gameOver = false;
      boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove("x", "o");
        box.disabled = false;
      });
      msgContainer.classList.add("hide");
    }

    resetBtn.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", resetGame);


// let boxes = document.querySelectorAll(".box");
// let resetBtn = document.querySelector("#resetBtn");
// let newGame = document.querySelector("#Restart");
// let msg = document.querySelector(".msg");
// let msg1 = document.querySelector("#msg1");

// let turnO = true;
// let gameOver = false; 

// const winPatterns = [
//     [0, 1, 2],
//     [0, 3, 6],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//     [3, 4, 5],
//     [6, 7, 8]
// ];

// const resetGame = () => {
//     turnO = true;
//     enableBoxes();
//     msg.classList.add("hide");
// }

// boxes.forEach((box) => {
//     box.addEventListener("click", () =>{
//         if(turnO){
//             box.innerText = "O";
//             box.classList.add("o"); // Apply O color
//             turnO = false;
//         }else {
//              box.innerText = "X";
//              box.classList.add("x"); // Apply X color
//              turnO = true;
//         }
//         box.disabled = true;

//         checkWinner();
//     });
// });

// const disableBoxes = () => {
//     for(let box of boxes){
//         box.disabled = true;
//     }
// }

// const enableBoxes = () => {
//     for(let box of boxes){
//         box.disabled = false;
//         box.innerText = "";
//         box.classList.remove("x", "o"); // Remove previous colors
//     } 
// }

// const showWinner = (winner) => {
//     msg1.innerText = `Congratulations, winner is ${winner}`;
//     msg.classList.remove("hide");
//     disableBoxes();
// };

// const showDraw = () => {
//     msg1.innerText = "It's a Draw!";
//     msg.classList.remove("hide");
//     disableBoxes();
// };

// const checkWinner = () => {
//     for(let pattern of winPatterns){
//         let pos1Val = boxes[pattern[0]].innerText;
//         let pos2Val = boxes[pattern[1]].innerText;
//         let pos3Val = boxes[pattern[2]].innerText;

//         if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
//             if(pos1Val === pos2Val && pos2Val === pos3Val) {
//                 showWinner(pos1Val);
//             }
//         }
//     }
//      // If no winner and all boxes filled, it's a draw
//     let allFilled = true;
//     boxes.forEach((box) => {
//         if (box.innerText === "") {
//             allFilled = false;
//         }
//     });

//     if (allFilled) {
//         showDraw();
//     }

// };


// newGame.addEventListener("click", resetGame);
// resetBtn.addEventListener("click", resetGame);







