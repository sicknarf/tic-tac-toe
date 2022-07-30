/*----- constants -----*/
let gameBoard = [0, 0, 0,
                 0, 0, 0,
                 0, 0, 0,]
 // object that holds two players, their names, and their score
const players = {
    alpha: {
        'name': 'Player One',
        'score': 0,
        'turn' : true,
        'moveset' : 1,
    },
    bravo: {
        'name': 'Player Two',
        'score': 0,
        'turn' : false,
        'moveset' : -1,
    }
}

disable();

/*this  is  a vizualization of win conditions for my use.
const alphaWin = [
    [1, 1, 1,
     0, 0, 0,
     0, 0, 0,], // 0, 1, 2
    [1, 0, 0,
     0, 1, 0,
     0, 0, 1,], // 0, 4, 8
    [1, 0, 0,
     1, 0, 0,
     1, 0, 0,], // 0, 3, 6
    [0, 1, 0,
     0, 1, 0,
     0, 1, 0,], // 1, 4, 7
    [0, 0, 1,
     0, 0, 1,
     0, 0, 1,], // 2, 5, 8
    [0, 0, 1,
     0, 1, 0,
     1, 0, 0,], // 2, 4, 6
    [0, 0, 0,
     1, 1, 1,
     0, 0, 0,], // 3, 4, 5
    [0, 0, 0,
     0, 0, 0,
     1, 1, 1,], // 6, 7, 8
]
*/

/*----- app's state (variables) -----*/
let pAlphaScore = players.alpha.score;
let pBravoScore = players.bravo.score;
let turn = 1


/*----- cached element references -----*/
let resetButton = document.querySelector('.settings')
const button0 = document.getElementById('0');
const button1 = document.getElementById('1');
const button2 = document.getElementById('2');
const button3 = document.getElementById('3');
const button4 = document.getElementById('4');
const button5 = document.getElementById('5');
const button6 = document.getElementById('6');
const button7 = document.getElementById('7');
const button8 = document.getElementById('8');
document.querySelector('#pAlphaScore').innerText = pAlphaScore;
document.querySelector('#pBravoScore').innerText = pBravoScore;


/*----- event listeners -----*/
let gameBoardId = null;
button0.addEventListener("click", function(){
    gameBoardId = 0;
    gameplayAction();
    console.log(gameBoard)
})
button1.addEventListener("click", function(){
    gameBoardId = 1;
    gameplayAction();
    console.log(gameBoard)
})
button2.addEventListener("click", function(){
    gameBoardId = 2;
    gameplayAction();
    console.log(gameBoard)
})
button3.addEventListener("click", function(){
    gameBoardId = 3;
    gameplayAction();
    console.log(gameBoard)
})
button4.addEventListener("click", function(){
    gameBoardId = 4;
    gameplayAction();
    console.log(gameBoard)
})
button5.addEventListener("click", function(){
    gameBoardId = 5;
    gameplayAction();
    console.log(gameBoard)
})
button6.addEventListener("click", function(){
    gameBoardId = 6;
    gameplayAction();
    console.log(gameBoard)
})
button7.addEventListener("click", function(){
    gameBoardId = 7;
    gameplayAction();
    console.log(gameBoard)
})
button8.addEventListener("click", function(){
    gameBoardId = 8;
    gameplayAction();
    console.log(gameBoard)
})
resetButton.addEventListener("click", function (){
    gameBoard = [0, 0, 0,
                 0, 0, 0,
                 0, 0, 0,];
    console.log("game reset.");
    turn = 1
    console.log(gameBoard);
    enableButton();
    document.querySelector('h4').innerHTML = ''
    boardUpdater();
    document.getElementsByClassName('settings')[0].style.visibility='hidden'; 

})

document.querySelector('.gameInit').addEventListener('click', init);


/*----- functions -----*/
function disableButton(){
    button0.disabled = true;
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    button4.disabled = true;
    button5.disabled = true;
    button6.disabled = true;
    button7.disabled = true;
    button8.disabled = true;
}
function enableButton(){
    button0.disabled = false;
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;
    button4.disabled = false;
    button5.disabled = false;
    button6.disabled = false;
    button7.disabled = false;
    button8.disabled = false;
}
function pAlphaWins(){
    pAlphaScore = pAlphaScore + 1;
    document.querySelector('#pAlphaScore').innerText = pAlphaScore;
    document.querySelector('h4').innerHTML = '<span style="color:red">Player One has won the game!</span>'
    disableButton();
    document.getElementsByClassName('settings')[0].style.visibility='visible'; 

    return;
}
function pBravoWins(){
    pBravoScore = pBravoScore + 1
    document.querySelector('#pBravoScore').innerText= pBravoScore;
    document.querySelector('h4').innerHTML = '<span style="color:blue">Player Two has won the game!</span>'
    disableButton();
    document.getElementsByClassName('settings')[0].style.visibility='visible'; 

    return;
}
function pAlphaMove(){
    if (gameBoard[gameBoardId] === 0){
        gameBoard[gameBoardId] = players.alpha.moveset;
        document.querySelector('h4').innerHTML = ''
    } else {
        document.querySelector('h4').innerHTML = 'don\'t be cheeky, you can\'t play there!'
        turn = turn - 1
    }
    boardUpdater();
    winCheck();
    players.alpha.turn = false;
    players.bravo.turn = true;
    gameBoardId = null;
} 
function pBravoMove(){
    if (gameBoard[gameBoardId] === 0){
        gameBoard[gameBoardId] = players.bravo.moveset;
        document.querySelector('h4').innerHTML = ''
    } else {
        document.querySelector('h4').innerHTML = 'don\'t be cheeky, you can\'t play there!'
        turn = turn - 1
    }
    boardUpdater();
    winCheck();
    players.alpha.turn = true;
    players.bravo.turn = false
}

function gameplayAction() {
    if (turn % 2 === 0) {
        pBravoMove();
        turn++
    } else if (turn === 9){
        cheating();
        boardUpdater();
        document.querySelector('h4').innerText = 'it\'s a tie!';
        enableButton();
        document.getElementsByClassName('settings')[0].style.visibility='visible'; 

    } else {
        pAlphaMove();
        turn++
    }
    }

//the reason I named this function cheating is because I cannot figure out how to get the last piece to change, this is purely aesthetic and not gameplay related.
function cheating(){
    for(let i = 0; i < gameBoard.length; i++){
        if (gameBoard[i] === 0) {
            gameBoard[i] = -1;
        }
    }
}

function winCheck(){
    //player one check
    if (gameBoard[0] === 1 && gameBoard[1] === 1 && gameBoard[2] === 1){
        pAlphaWins();
    }
    if (gameBoard[0] === 1 && gameBoard[4] === 1 && gameBoard[8] === 1){
        pAlphaWins()
    }
    if (gameBoard[0] === 1 && gameBoard[3] === 1 && gameBoard[6] === 1){
        pAlphaWins()
    }
    if (gameBoard[1] === 1 && gameBoard[4] === 1 && gameBoard[7] === 1){
        pAlphaWins()
    }
    if (gameBoard[2] === 1 && gameBoard[5] === 1 && gameBoard[8] === 1){
        pAlphaWins()
    }
    if (gameBoard[2] === 1 && gameBoard[4] === 1 && gameBoard[6] === 1){
        pAlphaWins()
    }
    if (gameBoard[3] === 1 && gameBoard[4] === 1 && gameBoard[5] === 1){
        pAlphaWins()
    }
    if (gameBoard[6] === 1 && gameBoard[7] === 1 && gameBoard[8] === 1){
        pAlphaWins()
    }
    //player two check
    if (gameBoard[0] === -1 && gameBoard[1] === -1 && gameBoard[2] === -1){
        pBravoWins()
    }
    if (gameBoard[0] === -1 && gameBoard[4] === -1 && gameBoard[8] === -1){
        pBravoWins()
    }
    if (gameBoard[0] === -1 && gameBoard[3] === -1 && gameBoard[6] === -1){
        pBravoWins()
    }
    if (gameBoard[1] === -1 && gameBoard[4] === -1 && gameBoard[7] === -1){
        pBravoWins()
    }
    if (gameBoard[2] === -1 && gameBoard[5] === -1 && gameBoard[8] === -1){
        pBravoWins()
    }
    if (gameBoard[2] === -1 && gameBoard[4] === -1 && gameBoard[6] === -1){
        pBravoWins()
    }
    if (gameBoard[3] === -1 && gameBoard[4] === -1 && gameBoard[5] === -1){
        pBravoWins()
    }
    if (gameBoard[6] === -1 && gameBoard[7] === -1 && gameBoard[8] === -1){
        pBravoWins()
    }
}

function disable() {
    document.getElementsByClassName('scoreAlpha')[0].style.visibility='hidden'; 
    document.getElementsByClassName('scoreBravo')[0].style.visibility='hidden'; 
    document.getElementsByClassName('board')[0].style.visibility='hidden'; 
    document.getElementsByClassName('settings')[0].style.visibility='hidden';
    document.querySelector('h4').style.visibility='hidden';
}


function init(){
    document.getElementsByClassName('scoreAlpha')[0].style.visibility='visible'; 
    document.getElementsByClassName('scoreBravo')[0].style.visibility='visible'; 
    document.getElementsByClassName('board')[0].style.visibility='visible'; 
    document.getElementsByClassName('gameInit')[0].style.display='none';
    document.querySelector('h4').style.visibility='visible';
    //document.getElementById('gameInit').style.display='none';
}

function boardUpdater(){
    for (let i = 0 ; i < 9; i++) {
        if (gameBoard[i] === 1){
            document.getElementById(String(i)).innerHTML = '<img src="https://i.imgur.com/fjGfZ3m.png">'
        } else if (gameBoard[i] === -1){
            document.getElementById(String(i)).innerHTML = '<img src="https://i.imgur.com/WPlpor8.png">' 
        } else if (gameBoard[i] ===  0){
            document.getElementById(String(i)).innerHTML = '<img src="https://i.imgur.com/GM5xkQM.png">' 
        }
    }
}

/*
0, 1, 2
0, 4, 8
0, 3, 6
1, 4, 7
2, 5, 8
2, 4, 6
3, 4, 5
6, 7, 8
*/