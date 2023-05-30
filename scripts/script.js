'use strict';

const gameBoard = () => {
    let _gameboard = [];

    let _symbol = 'X';
        
    
    //2D Array
    function resetBoard(){
        _gameboard = [
            ['','',''],
            ['','',''],
            ['','','']];
    };

    function addSymbol(i,j){
        _gameboard[j][i] = `${_symbol}`;
    };

    function viewGameBoard(){
        console.log(_gameboard);
    };
 
   return {viewGameBoard, addSymbol,resetBoard};
}

//Player object
function Player (name,symbol){
    this.name;
    this.symbol;
}


// Object.create();
let game = gameBoard();
game.resetBoard();
game.addSymbol(0,2);
game.viewGameBoard();