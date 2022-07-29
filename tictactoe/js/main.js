/*----- constants -----*/
const gameBoard = [ 0, 0, 0,
                    0, 0, 0,
                    0, 0, 0,]
const players = {
    alpha: {
        'name': 'Player One',
        'score': 0,
    },
    bravo: {
        'name': 'Player Two',
        'score': 0,
    }
} // object that holds two players, their names, and their score

/*----- app's state (variables) -----*/
let pAlphaScore = players.alpha.score;
let pBravoScore = players.bravo.score;

/*----- cached element references -----*/


/*----- event listeners -----*/


/*----- functions -----*/
function pAlphaWins(){
    pAlphaScore = pAlphaScore + 1
}
function pBravoWins(){
    pBravoScore = pBravoScore + 1
}
function pAlphaMove(){

} 
function pBravoMove(){

}