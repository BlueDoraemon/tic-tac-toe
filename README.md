# Tic Tac Toe in Browser
![Tic-Tac-Toe](images/tic-tac-toe.gif)



Learning Outcomes
--------------------

-- Modular design patterns

-- Factory Functions 

--Added a feature to add tokens based on letters in your name that are not already taken

--Unbeatable AI using Minimax algorithm and alpha beta pruning

-- Mobile responsive design




This is a JavaScript implementation of a tic-tac-toe game. It consists of two modules: `gameBoard` and `gameController`. The `gameBoard` module handles the game logic and state, while the `gameController` module controls the flow of the game and interacts with the user interface.

## Player factory function

The `createPlayer` function is a factory function that creates a player object with the specified name and symbol. The player object has methods to get the name, symbol, points, and update the points when the player wins a game.

## gameBoard Module

The `gameBoard` module is an immediately-invoked function expression (IIFE) that encapsulates the game logic and state. It contains private variables `_gameboard` and `_turn` to store the game board and current turn number, respectively.

### Public functions:

- `resetBoard()`: Resets the game board and turn number to start a new game.
- `newTurn()`: Increments the turn number.
- `turnNo()`: Returns the current turn number.
- `addSymbol(i, j, symbol)`: Adds the specified symbol to the game board at the given position (i, j).
- `removeSymbol(i, j)`: Removes the symbol from the game board at the given position (i, j).
- `viewGameBoard()`: Logs the current game board to the console.
- `checkGrid(i, j)`: Returns the symbol at the specified position (i, j) on the game board.
- `checkWin(player, boolMinMax)`: Checks if the specified player has won the game. If `boolMinMax` is `false`, it displays the winning message. Returns `true` if the player has won, `false` otherwise.
- `isBoardFull()`: Checks if the game board is full (all squares are occupied).
  
## gameController Module

The `gameController` module is also an IIFE responsible for controlling the flow of the game and handling the user interface interactions. It contains private variables `_loginScreen`, `_header`, `_playerScreen`, `_mainScreen`, `_result`, and `players`.

### Public functions:

- `startGame(ai)`: Starts the game. If `ai` is `true`, the game will be played against an AI opponent.
- `results(string)`: Displays the specified string as the game result.
- `tryAgain()`: Restarts the game after a result is shown.
- `home()`: Goes back to the home screen.
- `init()`: Initializes the game by adding event listeners and setting up the initial UI.
