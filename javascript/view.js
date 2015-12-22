var TETRIS = TETRIS || {}

TETRIS.view = (function() {

  var _rows,
      _columns;

  function init(rows, columns) {
    // create invisible rows
    _rows = rows + 3;
    _columns = columns - 1;
    _renderBoard(_rows, _columns);
    enableControls();
  };

  function tic(currentBlockCoords, setCells) {
    clearFallingBlocks();
    $.each(currentBlockCoords, renderFallingBlock);
    $.each(setCells, renderSetCells);
  };

  function _renderBoard(rows, columns) {
    
    $board = $('.board-container');
    boardTags = "<table>";

    // create rows, only show visible rows (r > 4)
    for (var i = 4; i <= rows; i++) {

      boardTags += "<tr>";
      // create columns
      for (var j = 0; j <= columns; j++) {
        boardTags += "<td class='cell " + i + "-" + j + "'></td>";
      };

      boardTags += "</tr>";
    };

    boardTags += "</table>";
    $board.append(boardTags);

  };

  function renderFallingBlock(index, coords) {
    cellClassCoords = '.' + coords[0] + '-' + coords[1];
    $(cellClassCoords).addClass('falling-cell');
  };

  function renderSetCells(index, cell) {
    cellClassCoords = '.' + cell.row + '-' + cell.column;
    $(cellClassCoords).addClass('set');
  };

  function clearFallingBlocks() {
    $('td').removeClass('falling-cell');
  };

  function enableControls() {
    $(window).on('keydown', TETRIS.controller.keydown);
  };

  function disableControls() {
    $(window).off('keydown');
  };

  function renderGameOver() {
    disableControls();
    $('.scoreboard').append("<center><h2>Game Over!</h2></center>");
  }

  return {
    init: init,
    tic: tic,
    clearFallingBlocks: clearFallingBlocks,
    renderGameOver: renderGameOver,
    renderFallingBlock: renderFallingBlock
  };
  
})();