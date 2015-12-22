var TETRIS = TETRIS || {}

TETRIS.controller = (function() {

  var rows = 20;
  var columns = 10;
  var interval;

  function init() {
    TETRIS.board.init(rows, columns);
    TETRIS.view.init(rows, columns);
    interval = setInterval(tic, 200);
  };

  function tic(blockName, headCell, orientation) {
    TETRIS.board.tic();
    currentBlockCoords = TETRIS.board.getCurrentBlockCoords();
    setCells = TETRIS.board.getSetCells();
    TETRIS.view.tic(currentBlockCoords, setCells);
    checkGameOver();
  };

  function keydown() {
    var input = event.which;
    switch(input) {
      case 37:
        TETRIS.board.slideBlockLeft();
        break;
      case 39:
        TETRIS.board.slideBlockRight();
        break;
      case 38:
        TETRIS.board.rotateBlock();
        break;
    };
  };

  function resetInterval() {
    interval = setInterval(tic, 200);
  };

  function checkGameOver() {
    if (TETRIS.board.collidesWithTop()) {
      clearInterval(interval);
      TETRIS.view.renderGameOver();
    };
  };

  return {
    init: init,
    keydown: keydown,
    tic: tic
  };
  
})();

$(document).ready(function() {
  TETRIS.controller.init();
});