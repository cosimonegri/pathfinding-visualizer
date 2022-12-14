import { getDistance } from "utils/helpers/helpers";
import { CELL_SIZE_WITH_OUTLINE } from "utils/constants/constants";
import cellStyles from "components/Grid/cell.module.css";

export const createCell = (row, col) => {
  return {
    row: row,
    col: col,
    isWall: false,
    isWeight: false,
  };
};

export const getExplorationCell = (cell, endRow, endCol) => {
  return {
    ...cell,
    visited: false,
    visitedFromEnd: false,
    parent: null,
    parentFromEnd: false,
    distance: Infinity,
    heuristic: getDistance(cell.row, cell.col, endRow, endCol),
  };
};

export const getCellForMaze = (cell) => {
  return {
    row: cell.row,
    col: cell.col,
    visited: false,
    isPassage: false,
    parent: null,
  };
};

export const isStart = (cell, startCoords) => {
  return cell.row === startCoords.row && cell.col === startCoords.col;
};

export const isEnd = (cell, endCoords) => {
  return cell.row === endCoords.row && cell.col === endCoords.col;
};

export const isOnlyWall = (cell, startCoords, endCoords) => {
  return cell.isWall && !isStart(cell, startCoords) && !isEnd(cell, endCoords);
};

export const isOnlyWeight = (cell, startCoords, endCoords) => {
  return (
    cell.isWeight && !isStart(cell, startCoords) && !isEnd(cell, endCoords)
  );
};

export const isClear = (cell, startCoords, endCoords) => {
  return (
    !cell.isWall &&
    !cell.isWeight &&
    !isStart(cell, startCoords) &&
    !isEnd(cell, endCoords)
  );
};

// The cell must have ROW and COL props
export const getCoords = (cell) => {
  return [cell.row, cell.col];
};

// The cells must have ROW and COL props
export const haveSameCoords = (cell1, cell2) => {
  return cell1.row === cell2.row && cell1.col === cell2.col;
};

// The cells must have ROW and COL props
export const compareCoords = (cell1, cell2) => {
  if (cell1.row < cell2.row) {
    return -1;
  } else if (cell1.row > cell2.row) {
    return 1;
  }
  if (cell1.col < cell2.col) {
    return -1;
  } else if (cell1.col > cell2.col) {
    return 1;
  }
  return 1;
};

export const areCoordsInBound = (row, col, rowsNum, colsNum) => {
  return 0 <= row && row < rowsNum && 0 <= col && col < colsNum;
};

// The cell must have ROW and COL props
export const isCellInBound = (cell, rowsNum, colsNum) => {
  return areCoordsInBound(cell.row, cell.col, rowsNum, colsNum);
};

export const getNeighborsCoordsWithJump = (row, col, jump) => {
  return [
    { row: row - jump, col: col },
    { row: row, col: col + jump },
    { row: row + jump, col: col },
    { row: row, col: col - jump },
  ];
};

// The cell must have ROW and COL props
export const getValidNeighbors = (cell, grid) => {
  let neighbors = [];
  let neighborsCoords = getNeighborsCoordsWithJump(cell.row, cell.col, 1);

  let rowsNum = grid.length;
  let colsNum = grid[0].length;

  for (let { row, col } of neighborsCoords) {
    if (areCoordsInBound(row, col, rowsNum, colsNum)) {
      neighbors.push(grid[row][col]);
    }
  }

  return neighbors;
};

// The cell must have ROW and COL props
export const getValidNeighborsWithJump = (cell, grid, jump) => {
  let neighbors = [];
  let neighborsCoords = getNeighborsCoordsWithJump(cell.row, cell.col, jump);

  let rowsNum = grid.length;
  let colsNum = grid[0].length;

  for (let { row, col } of neighborsCoords) {
    if (areCoordsInBound(row, col, rowsNum, colsNum)) {
      neighbors.push(grid[row][col]);
    }
  }

  return neighbors;
};

// The cell must have ROW and COL props
export const getValidUpDownNeighbors = (cell, grid) => {
  let neighbors = [];
  let neighborsCoords = [
    { row: cell.row - 1, col: cell.col },
    { row: cell.row + 1, col: cell.col },
  ];

  let rowsNum = grid.length;
  let colsNum = grid[0].length;

  for (let { row, col } of neighborsCoords) {
    if (areCoordsInBound(row, col, rowsNum, colsNum)) {
      neighbors.push(grid[row][col]);
    }
  }

  return neighbors;
};

// The cell must have ROW and COL props
export const getValidLeftRightNeighbors = (cell, grid) => {
  let neighbors = [];
  let neighborsCoords = [
    { row: cell.row, col: cell.col - 1 },
    { row: cell.row, col: cell.col + 1 },
  ];

  let rowsNum = grid.length;
  let colsNum = grid[0].length;

  for (let { row, col } of neighborsCoords) {
    if (areCoordsInBound(row, col, rowsNum, colsNum)) {
      neighbors.push(grid[row][col]);
    }
  }

  return neighbors;
};

export const getCellFromTouchPosition = (event, gridStartPosition, grid) => {
  const x = event.touches[0].clientX;
  const y = event.touches[0].clientY;
  const startX = gridStartPosition.current.x;
  const startY = gridStartPosition.current.y;

  const row = Math.floor((y - startY) / CELL_SIZE_WITH_OUTLINE);
  const col = Math.floor((x - startX) / CELL_SIZE_WITH_OUTLINE);
  return grid[row][col];
};

//! Do the following functions create problems? Is it possibile to optimize them?

// The cell must have ROW and COL props
export const makeVisitedVisually = (cell) => {
  document.getElementById(
    `cell-${cell.row}-${cell.col}`
  ).className = `${cellStyles.cell} ${cellStyles.visited}`;
};

// The cell must have ROW and COL props
export const makePathVisually = (cell) => {
  document.getElementById(
    `cell-${cell.row}-${cell.col}`
  ).className = `${cellStyles.cell} ${cellStyles.path}`;
};

// The cell must have ROW and COL props
export const clearCellVisually = (cell) => {
  document.getElementById(`cell-${cell.row}-${cell.col}`).className = document
    .getElementById(`cell-${cell.row}-${cell.col}`)
    .className.replace(`${cellStyles.visited}`, "");
  document.getElementById(`cell-${cell.row}-${cell.col}`).className = document
    .getElementById(`cell-${cell.row}-${cell.col}`)
    .className.replace(`${cellStyles.path}`, "");
};
