// state 
    const state = {};

    const resetState = () =>  { 

    state.board = [ 
   {value: '', isFilled: false},
   {value: '', isFilled: false},
   {value: '', isFilled: false},
   {value: '', isFilled: false},
   {value: '', isFilled: false},
   {value: '', isFilled: false},    
   {value: '', isFilled: false},
   {value: '', isFilled: false},
   {value: '', isFilled: false},
  ];

    state.players = ['', ''] 
    state.currentPlayerIndex = 0;
    state.scores = [0, 0];
    state.lastSquareIndex = -1; 
    state.winner = '';
 }

// helper functions
const getCurrentPlayer = () => state.players[state.currentPlayerIndex] // one line no return or {}
 
const changeTurn = () => {
     state.currentPlayerIndex = state.currentPlayerIndex === 0 ? 1 : 0; //ternary decides player order
}   

const takeTurn = (boxIndex) => {
    if(!state.players[0] || !state.players[1]) return;

    if (state.board[boxIndex].isFilled) return;
    
     
    state.board[boxIndex].isFilled = true;
    state.scores[state.currentPlayerIndex]++;

    changeTurn();
    }
    

const renderAll = () => {
    renderBoard();
    renderPlayer();
    renderScore();
}
        
// const checkBoard = () => {
//     for (let i = 0; i < state.board.length; i ++) {
//         const square = state.board[i];
//         if (!square.isFilled) return;
//     }
//     state.winner = getWinner();
// }

// const getWinner = () => {
//     const [player1Score, player2Score] = state.scores //destructuring
//     let winningPlayerIndex = player1Score > player2Score ? 0 : 
//         player1Score === player1Score ? -1 : 1; // ternary
//     return state.players[winningPlayerIndex];
// }

// DOM selectors
const boardElem = document.getElementById('board'); 
const playerTurnElem = document.getElementById('player-turn');
const scoreElem = document.getElementById('score');

// DOM manipulations
const renderBoard = () => { 
    boardElem.innerText = ''; // reset board
    for (i = 0; i < state.board.length; i++) { // loops through board
        const square = state.board[i]; // renames state.board[i]
        const boxElem = document.createElement('div'); // creates div elements
        boxElem.classList.add('box'); // adds 'box class to boxElem

        boxElem.dataset.index = i; // adds data-index to divs
        boardElem.appendChild(boxElem); // appends boxElem to boardElem 
    }
}

const renderPlayer = () => { 
    let text;
    if (!state.players[0] || !state.players[1]) {
        text = `
            <input name ='player1' placeholder='enter player X's name'>
            <input name ='player2' placeholder='enter player 0's name'>
            <button class ='start'> Start </button>
            `
    } else if (state.winner || state.winner === undefined) {
      const winner = getWinner() || 'nobody';
        text = `
        <span class = 'player'> ${getWinner()} wins! </span>
            ` ;
    } else {
      text = `${getCurrentPlayer()}'s turn`
    }
    playerTurnElem.innerHTML = text;

    if(state.winner !== '') {
        const playAgainButton = document.createElement('button');
        playAgainButton.innerHTML = `
        <button class = 'restart' > Play Again? </button>
        `;
        playerTurnElem.appendChild(playAgainButton);
    }
}

const renderScore = () => {
    scoreElem.innerHTML = `
    <h3>${state.players[0]}: ${state.scores[0]}</h3>
    <h3>${state.players[1]}: ${state.scores[1]}</h3>  
    `
}

function renderMark(boxIndex) {
    for (i = 0; i < board.length; i++);
     const boxElem = document.getElementsByClassName('box')[boxIndex];

    if (state.players[0] && state.currentPlayerIndex === 0 && !state.board[boxIndex].isFilled) {
        boxElem.innerText = `X`; 
        boxElem.isFilled = true;

        takeTurn(boxIndex);
    
    } if (state.players[1] && state.currentPlayerIndex === 1 && !state.board[boxIndex].isFilled) {
        boxElem.innerText = `O`;
        boxElem.isFilled = true;
        
        takeTurn(boxIndex);

    } else return 
    
}

// event listeners

boardElem.addEventListener('click', (event) => { //event delegation
    if (event.target.className !== 'box') return; //keeps user from clicking board border

    if (event.target.className === 'box') {
        let boxIndex = event.target.dataset.index; //grabs data-index

        renderMark(boxIndex);
        renderPlayer();
        renderScore();
    } 
})

playerTurnElem.addEventListener('click', (event) => {
    if (event.target.className !== 'start') return;
    if (event.target.className === 'restart') {
        resetState();
        renderAll();
    } else {    
    const player1input = document.getElementsByName('player1')[0];
    state.players[0] = player1input.value;

    const player2input = document.getElementsByName('player2')[0];
    state.players[1] = player2input.value;

    renderAll();
    }
})

//bootstrapping
resetState();
renderAll();