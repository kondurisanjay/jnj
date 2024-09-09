`use strict`;

// selecting player-0 and player-1 and dice
// we can select both document.query and getelementbyid for id selector
const scoreOfPlayerZero = document.querySelector("#score--0");
const scoreOfPlayerone = document.getElementById("score--1");
const diceForGame = document.querySelector(".dice");

// creating buttons for newgame,hold and roll
const btnNewGame = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

// creating player0 and player1 score
const currentScoreOfPlayerOne = document.querySelector("#current--0");
const currentScoreOfPlayerTwo = document.querySelector("#current--1");

// creating for section classes
const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");

// Variables to hold game state
let score, currentscore, activeplayer, playing;

let project = function () {
  // initializing the all the scores to zero
  scoreOfPlayerZero.textContent = 0;
  scoreOfPlayerone.textContent = 0;
  currentScoreOfPlayerOne.textContent = 0;
  currentScoreOfPlayerTwo.textContent = 0;
  diceForGame.classList.add("hidden");

  // resetting game state
  score = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  // resetting player states
  // used in css
  playerOne.classList.remove("player--winner");
  playerTwo.classList.remove("player--winner");
  playerOne.classList.add("player--active");
  playerTwo.classList.remove("player--active");
};

// Function to switch between players
let switchplayer = function () {
  // if (activeplayer === 0) {
  //     activeplayer = 1;
  //   } else {
  //     activeplayer = 0;
  //   }
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  playerOne.classList.toggle(`player--active`);
  playerTwo.classList.toggle(`player--active`);
};

// adding functionality for rolling a dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1.genrating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2.displaying dice
    diceForGame.classList.remove("hidden");
    diceForGame.src = `dice-${dice}.png`;

    //   3.checking whether its one or not
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});

// Adding functionality for the Hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    // transforming currentplayer score to activeplayer totalscore
    score[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer];
    //   checking>=100

    if (score[activeplayer] >= 15) {
      //   finish the game
      playing = false;
      diceForGame.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      //   switch to the next player
      switchplayer();
    }
  }
});

// document.querySelector(".btn--new").addEventListener("click", project);
// New Game button to reset everything
btnNewGame.addEventListener("click", project);
// New Game button to reset everything
project();
