'use strict';
const dice = document.querySelector('.dice');

const p0Score = document.getElementById('score--0');
const p1Score = document.getElementById('score--1');
const p0Current = document.getElementById('current--0');
const p1Current = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

let currentScore;
let activePlayer;
let score;
let playing;

//* Reseting everything
const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  dice.classList.add('hidden');

  p0Score.textContent = 0;
  p1Score.textContent = 0;
  p0Current.textContent = 0;
  p1Current.textContent = 0;

  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//* Rolling the dice
rollDice.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    //   console.log(diceNumber);
    dice.classList.remove('hidden');
    //* We make the source image dinamic based on the dice number
    dice.src = `dice-${diceNumber}.png`;

    //* If dice is different than one user keep playing, otherwise then is change of turn
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      //* Active player selection
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//*Switching player hold button
hold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

//* Start a new game
newGame.addEventListener('click', function () {
  init();
});
