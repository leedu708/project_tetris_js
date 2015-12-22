var TETRIS = TETRIS || {}

TETRIS.controller = (function() {

  var rows = 20;
  var columns = 10;
  var interval;

  function init() {
    TETRIS.view.init(rows, columns);
    TETRIS.board.init(rows, columns);    
  };

  function start() {
    $('button').attr('disabled', true).off('click');
    TETRIS.view.enableControls();
    resetInterval();
  }

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

  function restart() {
    $('.start-button').off('click');
    TETRIS.controller.init();
  }

  return {
    init: init,
    keydown: keydown,
    start: start,
    restart: restart,
    tic: tic
  };
  
})();

$(document).ready(function() {
  TETRIS.controller.init();
});