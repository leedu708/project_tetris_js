var TETRIS = TETRIS || {}

TETRIS.board = (function() {

  var _rows;
  var _columns;
  var _blockNames;
  var score = 0;  
  var cells = [];
  var currentBlock;

  function init(rows, columns) {
    // create invisible rows
    cells = [];
    score = 0;
    currentBlock = null;
    _rows = rows + 3;
    _columns = columns - 1;
    _blockNames = ["I", "O", "T", "S", "Z", "J", "L"];
    _buildBoard(_rows, _columns);
  };

  function tic() {
    _checkCollision();
    _checkAllRows();
    if (currentBlock) {      
      currentBlock.headCell = cells[currentBlock.headCell.id + 10];
    }

    else {
      currentBlock = new Block();
    };
  };

  function _buildBoard(rows, columns) {
    for (var i = 0; i <= rows; i++) {
      var newRow = [];
      for (var j = 0; j <= columns; j++) {
        var newCell = new Cell(i, j);
        cells.push(newCell);
      };
    };

    return cells;
  };

  function Block() {
    this.name = _blockNames[_randNum(0, _blockNames.length - 1)];
    this.headCell = cells[_randNum(22, 25)]
    this.orientation = _randNum(1, 4);
  }

  function Cell(row, column) {
    this.id = row * 10 + column;
    this.row = row;
    this.column = column;
    this.set = false;
  };

  function _checkCollision() {

    if (currentBlock) {
      coords = getCurrentBlockCoords();
      var i = 0;
      while (currentBlock && i < 4) {
        _collidesWithBottom(coords[i]);
        i++;
      }; 
    };

  };

  function _collidesWithBottom(coord) {
    oneCellDown = getCell(coord[0] + 1, coord[1]);
    if (coord[0] === 23 || oneCellDown.set) {
      _setCurrentBlock();
    }
  };

  function _collisionLeft() {
    coords = getCurrentBlockCoords();
    for (var i = 0; i < 4; i++) {
      checkCell = getCell(coords[i][0], coords[i][1]);
      if (checkCell.column === 0) {
        return true;
      }

      else if (getCell(checkCell.row, checkCell.column - 1).set) {
        return true;
      };
    };
  };

  function _collisionRight() {
    coords = getCurrentBlockCoords();
    for (var i = 0; i < 4; i++) {
      checkCell = getCell(coords[i][0], coords[i][1]);
      if (checkCell.column === 9) {
        return true;
      }

      else if (getCell(checkCell.row, checkCell.column + 1).set) {
        return true;
      };
    };
  };

  function collidesWithTop(){
    for (var i = 0; i < 10; i++) {
      index = 30 + i;
      if (cells[index].set) {
        return true;
      };
    };
  };

  function _checkAllRows() {
    for (i = 4; i < 24; i++) {
      if(_checkFullRow(i)) {
        _toggleSetRow(i);
        _shiftRowsDown(i);
      };
    };
  };

  function _checkFullRow(rowID) {
    var rowSetCells = [];
    for (var i = 0; i < 10; i++) {
      index = rowID * 10 + i;
      if (cells[index].set) {
        rowSetCells.push(cells[index]);
      };
    };

    if (rowSetCells.length === 10) {
      return true;
    };
  };

  function _setCurrentBlock() {
    coords = getCurrentBlockCoords();
    $.each(coords, _setCell);
    currentBlock = null;
  };

  function _setCell(index, coord) {
    cell = getCell(coord[0], coord[1]);
    cell.set = true;
  };

  function _toggleSetRow(rowID) {
    for (var i = 0; i < 10; i++) {
      index = rowID * 10 + i;
      cells[index].set = false;
    }

    score += 10;
  };

  function _shiftRowsDown(rowID) {
    setCells = getSetCells();
    for (var i = setCells.length - 1; i >= 0; i--) {
      if (setCells[i].id < rowID * 10) {
        setCells[i].set = false;
        cells[setCells[i].id + 10].set = true;
      };
    };
  };

  function rotateBlock() {
    if (!_collisionLeft() && !_collisionRight()) {
      if (currentBlock.orientation === 4) {
        currentBlock.orientation = 1;
      }

      else {
        currentBlock.orientation += 1;
      };
    };
  };

  function slideBlockLeft() {
    if (!_collisionLeft()) {
      currentBlock.headCell = cells[currentBlock.headCell.id - 1];
    };
  };

  function slideBlockRight() {
    if (!_collisionRight()) {
      currentBlock.headCell = cells[currentBlock.headCell.id + 1];
    };
  };

  function getCell(row, column) {
    var index = row * 10 + column;
    return cells[index];
  };

  function getScore() {
    return score;
  }

  function getCurrentBlock() {
    return currentBlock;
  };

  function getCurrentBlockCoords() {
    return TETRIS.block.build(currentBlock.name, currentBlock.headCell, currentBlock.orientation);
  };

  function getSetCells() {
    setCells = []
    cells.forEach( function(cell) {
      if (cell.set) {
        setCells.push(cell);
      };
    });

    return setCells;
  };

  function _randNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return {
    init: init,
    tic: tic,
    collidesWithTop: collidesWithTop,
    getCell: getCell,
    getCurrentBlock: getCurrentBlock,
    getCurrentBlockCoords: getCurrentBlockCoords,
    getScore: getScore,
    getSetCells: getSetCells,
    slideBlockLeft: slideBlockLeft,
    slideBlockRight: slideBlockRight,
    rotateBlock: rotateBlock
  };

})();