var TETRIS = TETRIS || {}

TETRIS.board = (function() {

  var _rows,
      _columns,
      _blockNames
  
  var cells = [];

  var currentBlock;

  function init(rows, columns) {
    // create invisible rows
    _rows = rows + 3;
    _columns = columns - 1;
    _blockNames = ["I", "O", "T", "S", "Z", "J", "L"];
    _buildBoard(_rows, _columns);
    currentBlock = null;
  };

  function tic() {
    _checkCollision();
    if (currentBlock) {      
      currentBlock.headCell = cells[currentBlock.headCell.id + 10];
    }

    else {
      currentBlock = new block();
    };
  };

  function _buildBoard(rows, columns) {
    for (var i = 0; i <= rows; i++) {
      for (var j = 0; j <= columns; j++) {
        var newCell = new cell(i, j);
        cells.push(newCell);
      };
    };

    return cells;
  };

  function block() {
    this.name = _blockNames[_randNum(0, _blockNames.length - 1)];
    this.headCell = cells[_randNum(34, 37)]
    this.orientation = _randNum(1, 4);
  }

  function cell(row, column) {
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

        if (currentBlock) {
          _collidesWithSetBlock(coords[i]);
        };

        i++;
      }; 
    };

  };

  function _collidesWithBottom(coord) {
    if (coord[0] === 23) {
      _setCurrentBlock();
    }
  };

  function _collidesWithSetBlock(coord) {
    oneCellDown = getCell(coord[0] + 1, coord[1]);
    if (oneCellDown.set) {
      _setCurrentBlock();
    }
  };

  function collidesWithTop(){
    for (var i = 0; i < 10; i++) {
      index = 30 + i;
      if (cells[index].set) {
        return true;
      };
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

  function rotateBlock() {
    if (currentBlock.orientation === 4) {
      currentBlock.orientation = 1;
    }

    else {
      currentBlock.orientation += 1;
    };
  };

  function slideBlockLeft() {
    currentBlock.headCell = cells[currentBlock.headCell.id - 1];
  };

  function slideBlockRight() {
    currentBlock.headCell = cells[currentBlock.headCell.id + 1];
  };

  function getCell(row, column) {
    var index = row * 10 + column;
    return cells[index];
  };

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
    cells: cells,
    collidesWithTop: collidesWithTop,
    getCell: getCell,
    getCurrentBlock: getCurrentBlock,
    getCurrentBlockCoords: getCurrentBlockCoords,
    getSetCells: getSetCells,
    slideBlockLeft: slideBlockLeft,
    slideBlockRight: slideBlockRight,
    rotateBlock: rotateBlock,
    block: block
  };

})();