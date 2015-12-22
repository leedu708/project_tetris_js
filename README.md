# project_tetris_js

By Dustin Lee

[Project provided by the Viking Code School](http://www.vikingcodeschool.com)

[Play Here](https://htmlpreview.github.io/?https://github.com/leedu708/project_tetris_js/blob/master/tetris.html)

##Overview

There are four JavaScript modules namespaced under TETRIS that make up the game.  The board module contains the board object which is comprised of cells and their information.  The view module displays the board in a coordinate system.  The block module creates blocks by returning the appropriate coordinates to the view to render.  The controller dictates the game loop on each "tick."

  ###Board

  Variables:

    - _rows: true row size of the board
    - _columns: true column size of the board
    - _blockNames: array containing the names of the blocks
    - score: current player score
    - cells: array containing the cells of the board
    - currentBlock: holds the current active (falling) block

  Functions:

    - init(): resets variables and adds hidden rows to the top of the board based on row input
    - tic(): moves the current block to its new head cell position
    - _buildBoard: pushes the board cells into the cells array

    - Block(): Block Object
      - name: random name generated from _blockNames
      - headCell: the cell containing the head of the block
      - orientation: current orientation of the piece

    - Cell(): Cell Object
      - id: cell ID
      - row: x-coordinate
      - column: y-coordinate
      - set: determines if cell is set

      - _checkCollision(): checks collision with the bottom side on each coordinate of the block
      - _collidsWithBottom(): checks if the x-coordinate of a cell hits the last row or a set cell
      - _collisionLeft(): checks if the y-coordinate of a cell hits the first column or a set block
      - _collisionRight(): checks if the y-coordinate of a cell hits the last column or a set block
      - collidesWithTop(): checks if any of the cells in the lowest HIDDEN row are set

      - _checkAllRows(): checks if any of the rows are full and then shifts as necessary
      - _checkFullRow(): checks if a row is completely set based on rowID
      - _toggleSetRow(): unset all cells of a row given rowID
      - _shiftRowsDown(): shifts all set cells on top of a toggled row one row down

      - _setCurrentBlock(): sets the current block when it collides from the bottom
      - _setCell(): can set an individual cell

      - rotateBlock(): increments orientation of a block as long as rotation is valid
      - slideBlockLeft(): decrements headCell ID of currentBlock
      - slideBlockRight(): increments headCell ID of currentBlock

      - getCell(): returns a cell given row and column
      - getScore(): returns score
      - getCurrentBlock(): returns currentBlock
      - getCurrentBlockCoords(): returns coordinates of the currentBlock
      - getSetCells(): returns an array of all cells that are set
      - _randNum(): returns a random number within a range

  ###View

  Variables:

    - _rows
    - _columns

  Functions:

    - init(): sets up the view as necessary and renders the board
    - tic(): renders the cells on the board on each frame
    - _renderBoard(): edits the DOM to render the board.  Each cell div has its own x-y coordinates as a class

    - _renderFallingBlock(): renders the falling block by adding 'falling-cell' class to cell divs given cell coordinates
    - _renderSetCells(): renders the set cells by adding 'set' class to cell divs given cell coordinates
    - _renderScore(): renders the scoreboard

    - _clearFallingBlocks(): clears the falling block
    - _clearSetCells(): clears set cells
    - enableControls(): adds keydown listener
    - disableControls(): removes keydown listener
    - renderGameOver(): disables controls and renders game over screen

  ###Block

  - Uses a build function to return the coordinates of a given block. It requires
    - blockName: to determine block type
    - headCell: to determine the coordinates of the headCell
    - orientation: to determine the orientation of the block
  - For rotation, the blocks pivot around the headCell. For flexibility, the headCell can be manipulated so that all blocks rotate around the same square in a 4x2 plane.

  ###Controller

  Variables:

    - rows: actual number of rows shown in view
    - columns: actual number of columns show in view
    - interval: interval of each tic
    - speed: sets speed of the interval

  Functions:

    - init(): initializes the board and view
    - start(): starts the game by enabling controls in the view and setting the interval
    - tic(): initializes the board and view tics as well as checking for game over
    - keydown(): moves block based on keycode of key pressed

    - _resetInterval: resets the game interval
    - _checkGameOver(): checks for game over from TETRIS.board.collidesWithTOP(). initializes view to render game over state.
    - restart(): restarts the game