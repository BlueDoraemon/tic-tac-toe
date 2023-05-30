# tic-tac-toe
Tic Tac Toe in browser WIP

1.store the gameboard as an array inside of a Gameboard object
 2.players are also going to be stored in objects
 3. object to control the flow of the game

*have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

4. HTML
5. render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)
6. functions that allow players to add marks to a specific spot on the board,  (Render them)
7. Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!
8. Optional - If you’re feeling ambitious create an AI so that a player can play against the computer!
Start by just getting the computer to make a random legal move.
Once you’ve gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it here, some googling will help you out with this one)

Learning Outcomes
--------------------
Experimenting with module patterns
Factory Functions 
Constructor functions using object.create() --> Prototype Heirarchy
Adding a subPub or events function handler /draw how modules fit together

Maybe feature some 3D gameplay / css  
1. Add dynamic SVGs
2. Moving the view by dragging the mouse left and right / touchscreen gesture.
3. Make the gameboard a 3x3x3.
