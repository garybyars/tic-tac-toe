// state 
    const state = {};

    const resetState = () =>  { 

    state.board = [ 
   {value: '', isFilled: false}, {value: '', isFilled: false}, {value: '', isFilled: false}, 
   {value: '', isFilled: false}, {value: '', isFilled: false}, {value: '', isFilled: false},    
   {value: '', isFilled: false}, {value: '', isFilled: false}, {value: '', isFilled: false},
  ];

    state.players = ['', ''] 
    state.currentPlayerIndex = 0;
    state.scores = [0, 0];
    state.winner = '';
 }

// helper functions
const getCurrentPlayer = () => state.players[state.currentPlayerIndex] // one line no return or {}
 
const changeTurn = () => {
     state.currentPlayerIndex = state.currentPlayerIndex === 0 ? 1 : 0; //ternary decides player order
}   

const takeTurn = (boxIndex) => {
    if(!state.players[0] || !state.players[1]) return;

    if(!state.board[boxIndex].isFilled) {
    state.board[boxIndex].isFilled = true;
    }

    changeTurn();
    checkBoard(boxIndex);
    }

const renderAll = () => {
    renderBoard();
    renderPlayer();
    renderScore();
}

    const checkBoard = () => {
        const winConditions = [
            [0, 1, 2],[3, 4, 5], [6, 7, 8], // win rows
            [0, 3, 6],[1, 4, 7], [2, 5, 8], // win columns
            [0, 4, 8],[2, 4, 6] // win diagonals 
        ]
    
        let possibilities = ['','','','','','','','','']

        for (i = 0; i < winConditions.length; i++) {
            const boxIndex1 = possibilities[winConditions[i][0]]
            const boxIndex2 = possibilities[winConditions[i][1]]
            const boxIndex3 = possibilities[winConditions[i][2]]
            if (boxIndex1 === '' || boxIndex2 === '' || boxIndex3 === '') continue;
            if (boxIndex1 === boxIndex2 && boxIndex2 === boxIndex3) { 
                state.scores[state.currentPlayerIndex]++

                getWinner();
            }
        }
    }

const getWinner = () => {
    const [player1Score, player2Score] = state.scores //destructuring
    let winningPlayerIndex = player1Score > player2Score ? 0 : 
        player1Score === player2Score ? -1 : 1; // ternary 
            return state.players[winningPlayerIndex];
}

// DOM selectors
const boardElem = document.getElementById('board'); 
const playerTurnElem = document.getElementById('player-turn');
const scoreElem = document.getElementById('score');

// DOM manipulations
const renderBoard = () => { 
    boardElem.innerText = ''; // reset board
    for (i = 0; i < state.board.length; i++) { // loops through board
        const boxElem = document.createElement('div'); // creates div elements
        boxElem.classList.add('box'); // adds 'box class to boxElem

        if(state.board[i].isFilled) {
            boxElem.innerText = state.board[i].value
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
    } else if (state.winner || state.winner === undefined) {
      const winner = getWinner() || 'nobody';
        text = `
        <span class = 'player'> ${winner} wins! </span>
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

const renderMark = (boxIndex) => {
    for (i = 0; i < board.length; i++);
     const boxElem = document.getElementsByClassName('box')[boxIndex];

    if (state.players[0] && state.currentPlayerIndex === 0 && !state.board[boxIndex].isFilled) {
        boxElem.innerText = `X`;
        boxIndex[i].value = `X`;

    } if (state.players[1] && state.currentPlayerIndex === 1 && !state.board[boxIndex].isFilled) {
        boxElem.innerText = `O`;
    }
    changeTurn();
}

// event listeners

boardElem.addEventListener('click', (event) => { //event delegation
    if (event.target.className !== 'box') return; //keeps user from clicking board border

    if (event.target.className === 'box') {
        let boxIndex = event.target.dataset.index; //grabs data-index

        renderMark(boxIndex);
        renderPlayer();
        renderScore();
        checkBoard(boxIndex);
    } 
})

playerTurnElem.addEventListener('click', (event) => {
    if (event.target.className === 'restart') {
        resetState();
        renderAll();

    } else if (event.target.className === 'start') { 
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