var TETRIS = TETRIS || {}

TETRIS.block = (function() {

  var blockCoords = [];
  var row;
  var col;

  function build(blockName, headCell, orientation) {
    row = headCell.row;
    col = headCell.column;
    switch(blockName) {
      case "I":
        return buildI(row, col, orientation);
        break;
      case "O":
        return buildO(row, col, orientation);
        break;
      case "T":
        return buildT(row, col, orientation);
        break;
      case "S":
        return buildS(row, col, orientation);
        break;
      case "Z":
        return buildZ(row, col, orientation);
        break;
      case "J":
        return buildJ(row, col, orientation);
        break;
      case "L":
        return buildL(row, col, orientation);
        break;
    };
  };

  // head is cell furthest to the left
  function buildI(row, col, orientation) {
    // horizontal I block
    if (orientation === 1 || orientation === 3) {
      blockCoords = [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]];
    }

    // vertical I block
    else {
      blockCoords = [[row, col], [row - 1, col], [row - 2, col], [row - 3, col]];
    };

    return blockCoords;
  };

  // head is top-left cell
  function buildO(row, col, orientation) {
    blockCoords = [[row, col], [row, col + 1], [row + 1, col], [row + 1, col + 1]];
    return blockCoords;
  };

  // pivots around the point-cell of T
  function buildT(row, col, orientation) {
    // long side at the bottom
    if (orientation === 1) {
      blockCoords = [[row, col], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]];
    }
    // long side to the left
    else if (orientation === 2) {
      blockCoords = [[row, col], [row - 1, col - 1], [row, col - 1], [row + 1, col - 1]];
    }
    // long side at the top
    else if (orientation === 3) {
      blockCoords = [[row, col], [row - 1, col -1], [row - 1, col], [row - 1, col + 1]];
    }
    // long side to the right
    else {
      blockCoords = [[row, col], [row - 1, col + 1], [row, col + 1], [row + 1, col + 1]];
    };

    return blockCoords;
  };

  // head is cell furthest to the right
  function buildS(row, col, orientation) {
    if (orientation === 1 || orientation === 3) {
      blockCoords = [[row, col], [row, col - 1], [row + 1, col - 1], [row + 1, col - 2]];
    }

    else {
      blockCoords = [[row, col], [row - 1, col], [row - 1, col - 1], [row - 2, col - 1]];
    };

    return blockCoords;
  };

  // head is cell furthest to the left
  function buildZ(row, col, orientation) {
    if (orientation === 1 || orientation === 3) {
      blockCoords = [[row, col], [row, col + 1], [row + 1, col + 1], [row + 1, col + 2]];
    }

    else {
      blockCoords = [[row, col], [row - 1, col], [row - 1, col + 1], [row - 2, col + 1]];
    };

    return blockCoords;
  };

  // head is cell pointing up
  function buildJ(row, col, orientation) {
    if (orientation === 1) {
      blockCoords = [[row, col], [row + 1, col], [row + 1, col + 1], [row + 1, col + 2]];
    }

    else if (orientation === 2) {
      blockCoords = [[row, col], [row, col - 1], [row + 1, col - 1], [row + 2, col - 1]];
    }

    else if (orientation === 3) {
      blockCoords = [[row, col], [row - 1, col], [row - 1, col - 1], [row - 1, col - 2]];
    }

    else {
      blockCoords = [[row, col], [row, col + 1], [row - 1, col + 1], [row - 2, col + 1]];
    };

    return blockCoords;
  };

  // head is cell pointing up
  function buildL(row, col, orientation) {
    if (orientation === 1) {
      blockCoords = [[row, col], [row + 1, col], [row + 1, col - 1], [row + 1, col - 2]];
    }

    else if (orientation === 2) {
      blockCoords = [[row, col], [row, col - 1], [row - 1, col - 1], [row - 2, col - 1]];
    }

    else if (orientation === 3) {
      blockCoords = [[row, col], [row - 1, col], [row - 1, col + 1], [row - 1, col + 2]];
    }

    else {
      blockCoords = [[row, col], [row, col + 1], [row + 1, col + 1], [row + 2, col + 1]];
    };

    return blockCoords;
  };

  return {
    build: build
  };

})();