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
                gameController.results(`${player.getName()} has won this round; j = ${j}`);
                return true;
            }
        }
        //check columns
        function _extractColumn(_arr, _column){
        return _arr.map((x)=>x[_column]);
        }

        for (let i = 0; i < _gameboard.length; i++){
            if (_extractColumn(_gameboard,i).every(isSymbol)) {
                gameController.results(`${player.getName()} has won this round; i = ${i}`);
                return true;
            }
        }
        //check diagonals
        let _diagDown = [_gameboard[0][0],_gameboard[1][1],_gameboard[2][2]];
        let _diagUp = [_gameboard[2][0],_gameboard[1][1],_gameboard[0][2]];
        if (_diagDown.every(isSymbol)) {
            gameController.results(`${player.getName()} has won this round; /`);
            return true;
        }
        if (_diagUp.every(isSymbol)) {
            gameController.results(`${player.getName()} has won this round; diagDown`);
            return true;
        }
        return false;
        //console.log(_diagDown,_diagUp); testing
    }

    // input return coordinates in an array and the player who won else return null
    function displayWin(){

    }
 
   return {viewGameBoard, addSymbol,resetBoard, checkWin};
})();


//Control the game Module

const gameController = (()=>{

    const _loginScreen = document.querySelector('.login');
    const _playerScreen = document.querySelector('.playerCreate');
    const _mainScreen = document.querySelector('main');
    const _result = document.querySelector('.results');
    let _turn = 1;
    let players = [];


    function startGame(ai){ // (T or F)
        //init
     //best of 5?

        _reset();

        const _grid = document.querySelector('.board');
        _grid.addEventListener('click',(e)=>{
            if (e.target.textContent !== '')  {
                e.target.classList.toggle('shake');
                return; // cancel click
            };
            render(e.target.id.toString());
            
            if (gameBoard.checkWin(_whoseTurnIsIt())){}
            else { 
                _turn++;
                (_turn >= 10) && gameController.results(`It's a Draw`);
                (ai) && _ai();
            }
            _scale();

        })
    }

    function _ai(){ //WIP

        console.log( 'AI'); // WIP


        function _randomLegalSquare(){
        
            //randomly choose a square
            let j = 0;
            let i = 0;
                
            function _checkIfOccupied(i,j){
                const _check = document.querySelector(`#g`+i+j);
                if (_check !== '') return true;
                else return false;
            }
            
            function _generateRandomNum(){
                return Math.round(Math.random() * 2);
            }
            
            let _occupied = true;
            while (_occupied === true) {
                i = _generateRandomNum();
                j = _generateRandomNum();
                _occupied = _checkIfOccupied(i,j);
            }

            render(`b${i}${j}`);
        }


        _randomLegalSquare();
        _turn++;
    }    

    function results(string){
        const _text = document.querySelector('#resultsText');
        _result.classList.toggle('show');
        _text.textContent = string;
    }
    // Rules of the game: 3 symbols in a row wins the game. 

    //Cannot place symbol on an occupied square.
    //render
    //whose turn is it? no input return player object
    function tryAgain(){
        _result.classList.toggle('show');
        _reset();
    }
    function home(){
        _result.classList.toggle('show');
        _mainScreen.classList.toggle('show');
        _loginScreen.classList.toggle('show'); 

        //remove all box elements
        const allBoxes = document.querySelectorAll('.right > div')
        const right = document.querySelector('.right');
        allBoxes.forEach((e)=>{
            right.removeChild(e);
        })

        _turn = 1;
        players = [];
    }

    function _reset(){
        gameBoard.resetBoard();
        const grid = document.querySelectorAll("main .grid");
        grid.forEach((e)=>{
            e.textContent = "";
        })
        _turn = 1;
        _scale();

    }
    function _scale(){
        const player1 = document.querySelector('#box1');
        const player2 = document.querySelector("#box2");
        if (_turn === 1){
            const right = document.querySelectorAll('.scale');
            right.forEach((element)=>{
                element.classList.toggle('scale');
            })
            player1.classList.toggle('scale');
        } else{
            player1.classList.toggle('scale');
            player2.classList.toggle('scale');
        }
    }
    function _whoseTurnIsIt(){
        return (_turn % 2 === 0 ) ? players[1] : players[0];
    }


    function render(id){
        let i = id[1];
        let j = id[2];
        gameBoard.addSymbol(j,i,_whoseTurnIsIt().getSymbol());
        gameBoard.viewGameBoard();
        const grid = document.querySelector("#g"+i+j);
        grid.textContent = _whoseTurnIsIt().getSymbol();


    }

    function _playerUI(maxPlayers,ai){ //maxPlayers two players = 2 ai boolean true or false
        let _playerName = "";
        let _token = null;
        const _name = document.querySelector('.playerCreate input');
        const _tokenGrid = document.querySelector('.box');
        const _next = document.querySelector('.next');
        const _span = document.querySelector('#nextspan');
        
        _rePlayerCreate();

        function _rePlayerCreate(){
            _playerName = "";
            _token = null;
            _name.value = "";
            const confirmed = document.querySelectorAll('.confirm');
            confirmed.forEach((e)=>{
                e.classList.toggle('confirm');
            })
            const grid = document.querySelectorAll('.playerCreate .box .grid');
            grid.forEach((e)=>{
                e.textContent = "";
            })
            _unstuck();
            _span.textContent = "";
        }

        function _createPlayer(name, token){
            players.push(createPlayer(name, token));

            //create box that shows on the right side of the window with the name and symbol
            const right = document.querySelector('.right');
            const box = document.createElement("div");
            const text = document.createElement("p");
            const symbol = document.createElement('p');
            box.id = `box${players.length}`;

            symbol.classList.add('symbol');
            text.textContent = name;
            symbol.textContent = token;

            box.appendChild(text);
            box.appendChild(symbol);
            right.appendChild(box);
              

        }

        function _convertToNineChar(str){ //no used tokens  
            function _checkIfTokenTaken(str){
                if (players.length === 0) return str;
                let newStr = "";
                str.split("").forEach((e)=>{
                    for (let index = 0; index < players.length; index++) {
                        (players[index].getSymbol() === e) ?null : newStr += e;
                    }
                })
                console.log(newStr);
                return newStr;
            }

            str += 'XOXOXOXOXOXOXOXOXOXO';
            return _checkIfTokenTaken(str).substr(0,9);
            
        }

        function _unstuck(){
            const stuckTokens = document.querySelectorAll('.stuck');
            stuckTokens.forEach((e)=>{
                e.classList.toggle('stuck');
            });
        }
 
        _name.addEventListener('change',()=>{ //on Name change
            _playerName = _name.value;
            let _tokenNames = _name.value.toUpperCase();
            //convert to a 9char string
            _tokenNames = _convertToNineChar(_tokenNames);
            //display as a grid of TOKENS to choose
            for (let index = 0; index < 9; index++) {
                const _gridNo = document.querySelector(`#p${(index+1)}.grid`);//couldnt be bothered rewrapping
                _gridNo.textContent = _tokenNames[index];
            };
            _unstuck();
            _token = null;
        })


        _tokenGrid.addEventListener('click',(e)=>{ //on click Grid for selecting tokens
            _unstuck();
            e.target.classList.toggle('stuck');
            _token = e.target.textContent;
        })
        function _nextF(){// on clicking next

                if (_playerName === "" || _token === null){
                    _next.classList.toggle('shake');
                    _span.textContent = (_playerName.value === "") ? "Please add a name" : "Choose a token";
                } else { 
                    _next.classList.toggle('confirm'); // make confirm class
                    _createPlayer(_playerName,_token);
                    if (players.length < maxPlayers) _rePlayerCreate();
                     else {_playerScreen.classList.toggle('show');
                    _mainScreen.classList.toggle('show');
                    if (ai) _createPlayer('AI', '💻'); // run on truthy
                    startGame(ai);
                     _next.removeEventListener('click',_nextF)
                        }
                }
        }
        _next.addEventListener('click',_nextF);
  
    }


    function init(){

        function _hideLogin(e){
            e.stopPropagation();
            _loginScreen.classList.toggle('show');
            _playerScreen.classList.toggle('show');
        }
        _loginScreen.addEventListener('click', (e)=>{
            // console.log(e.target);
            if (e.target.classList.contains("pl")){
                _hideLogin(e);
                _playerUI(2,false);
            } else if (e.target.classList.contains("ai"))  {
                _hideLogin(e);
                _playerUI(1,true);
            }   
        })
    }
    return {init, startGame, results, home, tryAgain};
})();

// const Testing() {} ------------------

// let player1 = createPlayer('bob','X');
// let player2 = createPlayer('greg','O');

// gameBoard.resetBoard();
// gameBoard.addSymbol(0,0,player1.getSymbol());

// gameBoard.addSymbol(1,1,player1.getSymbol());

// gameBoard.addSymbol(2,2,player1.getSymbol());


// gameBoard.checkWin(player1);
// gameBoard.viewGameBoard();
// player1.symbol = 'y';
// console.log(player1.getSymbol()); //Expect return 'X'

gameController.init();