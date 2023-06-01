'use strict';

//Player factory function
function createPlayer(name,symbol){

    let points = 0;
    function getName(){
        return name;
    }
    function getSymbol(){
        return symbol;
    }
    function winGame(){
        points++;
    }
    function getPoints(){
        return points;
    }
    return {
        getName, getSymbol, winGame, getPoints
    }
}

//gameBoard Module
const gameBoard = (function() {
    let _gameboard = [];
    //2D Array at the moment

    function resetBoard(){
        _gameboard = [
            ['','',''],
            ['','',''],
            ['','','']];
    };

    function addSymbol(i,j, symbol){
        _gameboard[j][i] = `${symbol}`;
    };

    function viewGameBoard(){
        console.log(_gameboard);
    };

    function checkWin(player){ //Obj

        const isSymbol = (char) => char === player.getSymbol();


        //check rows
        for (let j = 0; j < _gameboard.length; j++){
            if (_gameboard[j].every(isSymbol)) {
                console.log(`${player.getName()} has won this round; j = ${j}`)
            }
        }
        //check columns
        function _extractColumn(_arr, _column){
        return _arr.map((x)=>x[_column]);
        }

        for (let i = 0; i < _gameboard.length; i++){
            if (_extractColumn(_gameboard,i).every(isSymbol)) {
                console.log(`${player.getName()} has won this round; i = ${i}`)
            }
        }
        //check diagonals
        let _diagDown = [_gameboard[0][0],_gameboard[1][1],_gameboard[2][2]];
        let _diagUp = [_gameboard[2][0],_gameboard[1][1],_gameboard[0][2]];
        if (_diagDown.every(isSymbol)) {
            console.log(`${player.getName()} has won this round; /`)
        }
        if (_diagUp.every(isSymbol)) {
            console.log(`${player.getName()} has won this round; diagDown`)
        }

        //console.log(_diagDown,_diagUp); testing
    }

    // input return coordinates in an array and the player who won else return null
    function displayWin(){

    }
 
   return {viewGameBoard, addSymbol,resetBoard, checkWin};
})();


//Control the game Module

const gameController = (()=>{
    let _gameNo = 0;
    let _turn = 1;
    function startGame(){
        //init
     //best of 5?
        gameBoard.resetBoard();

        const grid = document.querySelector('.board');

        grid.addEventListener('click',(e)=>{
            if (e.target.textContent !== '')  {
                e.target.classList.toggle('shake');
                return;
            };
            render(e.target.id.toString());
            gameBoard.checkWin(_whoseTurnIsIt())
            _turn++;
        })
    }

    // Rules of the game: 3 symbols in a row wins the game. 

    //Cannot place symbol on an occupied square.
    //render
    //whose turn is it? no input return player object
    function _whoseTurnIsIt(){
        return (_turn % 2 === 0 ) ? player2 : player1;
    }


    function render(id){
        let i = id[1];
        let j = id[2];
        gameBoard.addSymbol(j,i,_whoseTurnIsIt().getSymbol());
        gameBoard.viewGameBoard();
        const grid = document.querySelector("#g"+i+j);
        grid.textContent = _whoseTurnIsIt().getSymbol();

    }
    return {startGame};
})();

// const Testing() {} ------------------

let player1 = createPlayer('bob','X');
let player2 = createPlayer('greg','O');

gameBoard.resetBoard();
gameBoard.addSymbol(0,0,player1.getSymbol());

gameBoard.addSymbol(1,1,player1.getSymbol());

gameBoard.addSymbol(2,2,player1.getSymbol());


gameBoard.checkWin(player1);
gameBoard.viewGameBoard();
player1.symbol = 'y';
console.log(player1.getSymbol()); //Expect return 'X'

gameController.startGame();