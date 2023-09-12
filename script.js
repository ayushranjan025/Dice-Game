'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El =  document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currScore = 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}


//rolling dice functionality
btnRoll.addEventListener('click', function(){

    if(playing){
        //generating random dice
        const dice = Math.trunc(Math.random() * 6 ) + 1;

        //displaying dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;


        //checking if dice has one or not if yes then switching the player
         if(dice !== 1){
           currScore += dice;
           document.getElementById(`current--${activePlayer}`).textContent = currScore;
        } else{
           switchPlayer();
        }
    }
    
});



let totalScore = 0;
//hold button functionality
btnHold.addEventListener('click', function(){

     if(playing){
        //adding current score to total score and displaying it
        scores[activePlayer]  += currScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //checking if the player has score more than 100 or not
        if(scores[activePlayer] >=100){
            diceEl.classList.add('hidden');
            playing = false;
            //active player won
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }else{
            //switching the player
            switchPlayer();
        }
  }

});


btnNew.addEventListener('click', init);