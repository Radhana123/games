let userScore = 0;
    let opponentScore = 0;
    let currentMode = "ai";
    let friendTurn = true;
    let friendChoice = "";

    const choices = document.querySelectorAll(".choice");
    const msg = document.querySelector("#msg");
    const detail = document.querySelector("#detail");
    const modeSelect = document.getElementById("mode");
    const userScorePara = document.querySelector("#user-score");
    const opponentScorePara = document.querySelector("#comp-score");
    const opponentLabel = document.querySelector("#vs-label p:last-child");
    const newGame = document.querySelector("#Restart");

    const genCompChoice = () => {
      const options = ["rock", "paper", "scissors"];
      const randIdx = Math.floor(Math.random() * 3);
      return options[randIdx];
    };

    const determineWinner = (user, opponent) => {
      if (user === opponent) return "draw";
      if ((user === "rock" && opponent === "scissors") ||
          (user === "paper" && opponent === "rock") ||
          (user === "scissors" && opponent === "paper")) return "user";
      return "opponent";
    };

    const updateScore = (winner, userChoice, opponentChoice) => {
      if (winner === "draw") {
        msg.innerText = `It's a draw!`;
        detail.innerText = `Both chose ${userChoice}`;
        msg.style.backgroundColor = "yellow";
        msg.style.color = "black";
      } else if (winner === "user") {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win!`;
        detail.innerText = `Your ${userChoice} beats ${opponentChoice}`;
        msg.style.backgroundColor = "green";
        msg.style.color = "white";
      } else {
        opponentScore++;
        opponentScorePara.innerText = opponentScore;
        msg.innerText = `You lose!`;
        detail.innerText = `${opponentChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        msg.style.color = "white";
      }
    };

    const resetGame = () => {
      userScore = 0;
      opponentScore = 0;
      userScorePara.innerText = 0;
      opponentScorePara.innerText = 0;
      msg.innerText = "Play your move";
      detail.innerText = "";
      msg.style.backgroundColor = "#081b31";
      msg.style.color = "white";
      friendTurn = true;
      friendChoice = "";
    };

    modeSelect.addEventListener("change", () => {
      currentMode = modeSelect.value;
      opponentLabel.innerText = currentMode === "ai" ? "Computer" : "Friend";
      resetGame();
    });

    newGame.addEventListener("click", resetGame);

    choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");

        if (currentMode === "ai") {
          const compChoice = genCompChoice();
          const winner = determineWinner(userChoice, compChoice);
          updateScore(winner, userChoice, compChoice);
        } else {
          if (friendTurn) {
            friendChoice = userChoice;
            msg.innerText = `Friend 1 chose. Now Friend 2, choose your move.`;
            detail.innerText = "";
            msg.style.backgroundColor = "#081b31";
            friendTurn = false;
          } else {
            const winner = determineWinner(friendChoice, userChoice);
            updateScore(winner, friendChoice, userChoice);
            friendTurn = true;
          }
        }
      });
    });


// let userScore = 0;
// let compScore = 0;

// const choices = document.querySelectorAll(".choice");
// const msg = document.querySelector("#msg");
// let newGame = document.querySelector("#Restart");

// const userScorePara = document.querySelector("#user-score");
// const compScorePara = document.querySelector("#comp-score");


// newGame.addEventListener("click", () => {
//     userScore = 0;
//     compScore = 0;
//     userScorePara.innerText = userScore;
//     compScorePara.innerText = compScore;

//     msg.innerText = "Play your move";
//     msg.style.backgroundColor = "#081b31";
//     msg.style.color = "#fff";
// });


// const genCompChoice = () => {
//     const options = ["rock", "paper", "scissors"];
//     const randIdx = Math.floor(Math.random()*3);
//     return options[randIdx];
// }

// const drawGame = () => {
//     msg.innerText = `Game was draw!`;
//     msg.style.backgroundColor = "yellow";
//     msg.style.color = "black";
// }

// const showWinner = (userWin, userChoice, compChoice) => {
//     if(userWin) {
//         userScore++;
//         userScorePara.innerText = userScore;
//         msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
//         msg.style.backgroundColor = "green";
//     } else {
//         compScore++;
//         compScorePara.innerText = compScore;
//         msg.innerText = `You lose!  ${compChoice} beats Your ${userChoice}`;
//         msg.style.backgroundColor = "red";
//     }
// }


// const playGame = (userChoice) => {
//     //Generate computer choice
//     const compChoice = genCompChoice();

//     if(userChoice === compChoice){
//       drawGame();
//     } else {
//         let userWin = true;
//         if(userChoice === "rock") {
//             //scissors, paper
//             userWin = compChoice === "paper" ? false: true;
//         } else if (userChoice === "paper") {
//             //scissors, rock
//             userWin = compChoice === "scissors" ? false: true;
//         }else {
//             //rock, paper
//             userWin = compChoice === "rock" ? false: true;
//         }
//         showWinner(userWin, userChoice, compChoice);
//     }
// };

// choices.forEach((choice) => {
//     choice.addEventListener("click", () => {
//         const userChoice = choice.getAttribute("id");
//         playGame(userChoice);
//     });
// });

//Math.floor(Math.random()*10 or 3)

 //html code

//  <main>
//     <h1>Rock Paper Scissors</h1>

//     <div>
//         <button id="Restart">New Game</button>
//        </div>
       
//     <div class="choices">
//         <div class="choice" id="rock">
//             <img src="./rock.png" />
//         </div>
//         <div class="choice" id="paper">
//             <img src="./paper.png" />
//         </div>
//         <div class="choice" id="scissor">
//             <img src="./scissors.png" />
//         </div>
//        </div>

//        <div class="score-board">
//         <div class="score">
//             <p id="user-score">0</p>
//             <p>You</p>
//         </div>
//         <div class="score">
//             <p id="comp-score">0</p>
//             <p>Comp</p>
//         </div>
//        </div>

//        <div class="msg-container">
//         <p id="msg">Play your move</p>
//        </div>
       