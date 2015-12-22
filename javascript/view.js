var TETRIS = TETRIS || {}

TETRIS.view = (function() {

  var _rows,
      _columns;

  function init(rows, columns) {
    // create invisible rows
    $('.gameover').remove();
    $('table').remove();
    _rows = rows + 3;
    _columns = columns - 1;
    _renderBoard(_rows, _columns);
    $('td').removeClass('falling-cell set');
    $('.start-button').text('Click to Start').on('click', TETRIS.controller.start);
  };

  function tic(currentBlockCoords, setCells) {
    _clearSetCells();
    _clearFallingBlocks();
    $.each(currentBlockCoords, _renderFallingBlock);
    $.each(setCells, _renderSetCells);
    _renderScore();
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

  function _renderFallingBlock(index, coords) {
    cellClassCoords = '.' + coords[0] + '-' + coords[1];
    $(cellClassCoords).addClass('falling-cell');
  };

  function _renderSetCells(index, cell) {
    cellClassCoords = '.' + cell.row + '-' + cell.column;
    $(cellClassCoords).addClass('set');
  };

  function _renderScore() {
    score = TETRIS.board.getScore();
    $('.score').text("Current Score: " + score);
  };

  function _clearFallingBlocks() {
    $('td').removeClass('falling-cell');
  };

  function _clearSetCells() {
    $('td').removeClass('set');
  }

  function enableControls() {
    $(window).on('keydown', TETRIS.controller.keydown);
  };

  function disableControls() {
    $(window).off('keydown');
  };

  function renderGameOver() {
    disableControls();
    $('.scoreboard').append("<div class='gameover'><center><h2>Game Over!</h2></center></div>");
    $('button').attr('disabled', false).text('Play Again?');
    $('.start-button').on('click', TETRIS.controller.restart);
  }

  return {
    init: init,
    tic: tic,
    enableControls: enableControls,
    renderGameOver: renderGameOver
  };
  
})();