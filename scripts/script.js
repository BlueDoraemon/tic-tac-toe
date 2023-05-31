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
    function checkWin(player){ //Object

        //check rows
        const isSymbol = (symbol) => symbol === player.getSymbol();

        for (let j = 0; j < _gameboard.length; j++){
            if (_gameboard[j].every(isSymbol)) {
                console.log(`${player.getName()} has won this round`)
            }
        }
        //check columns
        for (let i = 0; i < _gameboard.length; i++){
            _gameboard.map();// WIP
        }
        //check diagonals
    }
 
   return {viewGameBoard, addSymbol,resetBoard, checkWin};
})();






//Control the game Module

const displayController = (()=>{
    

    //init
     //best of 5?
     let gameNo = 0;
    gameBoard.resetBoard();
 

    // Rules of the game: 3 symbols in a row wins the game. 
    //check rows


    //Cannot place symbol on an occupied square.

    //checkWin

    //render
    return {

    };
})();

// Object.create();

// Testing ------------------


let player1 = createPlayer('bob','X');
let player2 = createPlayer('greg','O');

gameBoard.resetBoard();
gameBoard.addSymbol(0,2,player1.getSymbol());

gameBoard.addSymbol(1,2,player1.getSymbol());

gameBoard.addSymbol(2,2,player1.getSymbol());
gameBoard.checkWin(player1);
gameBoard.viewGameBoard();
player1.symbol = 'y';
console.log(player1.getSymbol()); //Expect return 'X'