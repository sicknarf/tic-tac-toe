/*----- constants -----*/
let gameBoard = [0, 0, 0,
                 0, 0, 0,
                 0, 0, 0,] // this is a let instead of a const to ensure proper functionality of a reset.
const boardTranslator = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight"] //to return the proper index to manipulate gameBoard
const resetButton = document.querySelector('.settings')
const gamePlayButton = document.querySelectorAll('.pieces');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

/*----- app's state (variables) -----*/
let pAlphaScore = 0;
let pBravoScore = 0;
let gameBoardId = null;
let turn = 1;

/*----- event listeners -----*/
resetButton.addEventListener("click", init);
document.querySelector('.gameInit').addEventListener('click', init);

/*----- functions -----*/
function pAlphaWins(){ // adds 1 to player score and updates the page
    pAlphaScore = pAlphaScore + 1;
    document.querySelector('#pAlphaScore').innerText = pAlphaScore;
    document.querySelector('h4').innerHTML = '<span style="color:red">Player One has won the game!</span>';
    document.getElementsByClassName('settings')[0].style.visibility='visible'; 
    disableButton();
}
function pBravoWins(){ // adds 1 to player score and updates the page
    pBravoScore = pBravoScore + 1;
    document.querySelector('#pBravoScore').innerText= pBravoScore;
    document.querySelector('h4').innerHTML = '<span style="color:blue">Player Two has won the game!</span>';
    document.getElementsByClassName('settings')[0].style.visibility='visible'; 
    disableButton();
}
function pAlphaMove(){ // checks that the chosen spot is playable, then updates
    if (gameBoard[gameBoardId] === 0){
        gameBoard[gameBoardId] = 1;
        document.querySelector('h4').innerHTML = '';
    } else {
        document.querySelector('h4').innerHTML = 'don\'t be cheeky, you can\'t play there!';
        turn = turn - 1;
    }
    boardUpdater();
    gameBoardId = null;
} 
function pBravoMove(){
    if (gameBoard[gameBoardId] === 0){
        gameBoard[gameBoardId] = -1;
        document.querySelector('h4').innerHTML = '';
    } else {
        document.querySelector('h4').innerHTML = 'don\'t be cheeky, you can\'t play there!';
        turn = turn - 1;
    }
    boardUpdater();
}
function winCheck(){ 
    for (let i = 0; i < winConditions.length; i++) {
        if (gameBoard[winConditions[i][0]] + gameBoard[winConditions[i][1]] + gameBoard[winConditions[i][2]] === 3) {
            pAlphaWins(); 
        } else if (gameBoard[winConditions[i][0]] + gameBoard[winConditions[i][1]] + gameBoard[winConditions[i][2]] === -3) {
            pBravoWins(); 
        }
    }
}
function init(){ // initialization function to start/reset the game. Scores are NOT reset intentionally.
    document.getElementsByClassName('scoreAlpha')[0].style.visibility='visible'; 
    document.getElementsByClassName('scoreBravo')[0].style.visibility='visible'; 
    document.getElementsByClassName('board')[0].style.visibility='visible'; 
    document.getElementsByClassName('gameInit')[0].style.display='none';
    document.querySelector('h4').style.visibility='visible';
    gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
    turn = 1;
    boardUpdater();
    document.querySelector('h4').innerHTML = '';
    document.getElementsByClassName('settings')[0].style.visibility='hidden'; 
    for (let i = 0; i < gamePlayButton.length; i++) {
        gamePlayButton[i].disabled = false
    };
}
function clickToPlay(clickedBox){ // I set up the HTML to trigger this function whenever a box is clicked.
    gameBoardId = boardTranslator.indexOf(clickedBox);
    if (turn % 2 === 0) {
        pBravoMove();
        winCheck();
        turn++;
    } else if (turn === 9){
        pAlphaMove();
        boardUpdater();
        document.querySelector('h4').innerText = 'it\'s a tie!';
        disableButton();
        winCheck();
        document.getElementsByClassName('settings')[0].style.visibility='visible'; 
    } else {
        pAlphaMove();
        winCheck();
        turn++
    }
}
function boardUpdater(){ // updates the game board to have the appropriate images depending on who played
    for (let i = 0 ; i < 9; i++) {
        if (gameBoard[i] === 1){
            document.getElementById(boardTranslator[i]).innerHTML = '<img src="https://i.imgur.com/fjGfZ3m.png">'
        } else if (gameBoard[i] === -1){
            document.getElementById(boardTranslator[i]).innerHTML = '<img src="https://i.imgur.com/WPlpor8.png">' 
        } else if (gameBoard[i] ===  0){
            document.getElementById(boardTranslator[i]).innerHTML = '<img src="https://i.imgur.com/GM5xkQM.png">' 
        }
    }
}
function disableButton(){ // disables the game board from future play at the end of a game
    for (let i = 0; i < gamePlayButton.length; i++) {
    gamePlayButton[i].disabled = true
}
}