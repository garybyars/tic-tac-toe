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

const renderAll = () => {
    renderBoard();
    renderPlayer();
    renderScore();
}
    
const takeTurn = (boxIndex) => {
     if (!state.players[0] || !state.players[1]) return;
     const square = state.board[boxIndex]
     if(square.isFilled) return; 
    
    square.isFilled = true;

    const lastSquareMarked = state.board[state.lastSquareIndex];
    state.lastSquareMarked = boxIndex;

//     //correct
//     if (square.value === lastSquareMarked.value) { // use this to check for wins later
//         state.scores[state.currentPlayerIndex]++;
//      //not correct   
//         state.lastSquareIndex = -1; // resets to empty
//     } else {
//     state.lastSquareIndex = boxIndex;
//     }
// }

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
}

// DOM selectors
const boardElem = document.getElementById('board'); 
const playerTurnElem = document.getElementById('player-turn');
const scoreElem = document.getElementById('score');

// DOM manipulations
const renderBoard = () => { 
    boardElem.innerHTML = ''; // reset board
    for (i = 0; i < state.board.length; i++) { // loops through board
        const square = state.board[i]; // renames state.board[i]
        const boxElem = document.createElement('div'); // creates div elements
        boxElem.classList.add('box'); // adds 'box class to boxElem
        
        if(boxElem.isFilled) {
            boxElem.innerText = square.value;
        }

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
    // } else if (state.winner || state.winner === undefined) {
    //   const winner = getWinner() || 'nobody';
    //     text = `
    //     <span class = 'player'> ${getWinner()} wins! </span>
    //         ` 
    } else {
      text = `${getCurrentPlayer()}'s turn`
    }
    playerTurnElem.innerHTML = text;

    // if(state.winner !== '') {
    //     const playAgainButton = document.createElement('button');
    //     playAgainButton.innerHTML = `
    //     <button class = 'restart' > Play Again? </button>
    //     `;
    //     playerTurnElem.appendChild(playAgainButton);
    // }
}

const renderScore = () => {
    scoreElem.innerHTML = `
    <h3>${state.players[0]}: ${state.scores[0]}</h3>
    <h3>${state.players[1]}: ${state.scores[1]}</h3>
    `
}

const renderMark = () => {
    for (i = 0; i < board.length; i++);
     const boxElem = document.getElementsByClassName('box')[0];
    if (state.players[0]) {
        boxElem.innerText = `X`;

    } else if (state.players[1]) {
        boxElem.innerText = `O`;
        boardElem.appendChild(boxElem)
    }
    changeTurn();
}

// event listeners

boardElem.addEventListener('click', (event) => { //event delegation
    if (event.target.className !== 'box') return; //keeps user from clicking board border
    let boxIndex = event.target.dataset.index; //grabs data-index
    state.board[boxIndex] = 'X'
    
    takeTurn(boxIndex);
    // checkBoard();
    renderAll();

    if(event.target.className === 'box' && state.board[boxIndex]) renderMark();
    
    console.log('clicked')
    // }
    
    // takeTurn(boxIndex);
    // checkBoard();
    // renderAll();

})

playerTurnElem.addEventListener('click', (event) => {
    // // if (event.target.className === 'restart') {
    // //     resetState();
    // //     renderAll();
    // }
    if (event.target.className !== 'start') return;

    const player1input = document.getElementsByName('player1')[0];
    state.players[0] = player1input.value;

    const player2input = document.getElementsByName('player2')[0];
    state.players[1] = player2input.value;

    renderAll();
})

//bootstrapping
resetState();
renderAll();