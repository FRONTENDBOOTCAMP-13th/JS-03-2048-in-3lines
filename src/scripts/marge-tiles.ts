
import { grid } from "./add-random-cell";
import { boardSize } from "./boardsize";
import { updateBoard } from "./board";

export function mergeTiles(direction: "up" | "down" | "left" | "right") {
  if (direction === "up") {
    for (let col = 0; col < boardSize; col++) {
      let column = [];
      for (let row = 0; row < boardSize; row++) {
        if (grid[row][col] !== 0) column.push(grid[row][col]);
      }
      for (let i = 0; i < column.length - 1; i++) {
        if (column[i] === column[i + 1]) {
          column[i] *= 2;
          column[i + 1] = 0;
        }
      }
      column = column.filter(v => v !== 0);
      while (column.length < boardSize) column.push(0);
      for (let row = 0; row < boardSize; row++) {
        grid[row][col] = column[row];
      }
    }
  }

  if (direction === "down") {
    for (let col = 0; col < boardSize; col++) {
      let column = [];
      for (let row = boardSize - 1; row >= 0; row--) {
        if (grid[row][col] !== 0) column.push(grid[row][col]);
      }
      for (let i = 0; i < column.length - 1; i++) {
        if (column[i] === column[i + 1]) {
          column[i] *= 2;
          column[i + 1] = 0;
        }
      }
      column = column.filter(v => v !== 0);
      while (column.length < boardSize) column.push(0);
      for (let row = boardSize - 1, i = 0; row >= 0; row--, i++) {
        grid[row][col] = column[i];
      }
    }
  }

  if (direction === "left") {
    for (let row = 0; row < boardSize; row++) {
      let newRow = grid[row].filter(v => v !== 0);
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newRow[i + 1] = 0;
        }
      }
      newRow = newRow.filter(v => v !== 0);
      while (newRow.length < boardSize) newRow.push(0);
      grid[row] = newRow;
    }
  }

  if (direction === "right") {
    for (let row = 0; row < boardSize; row++) {
      let newRow = grid[row].filter(v => v !== 0).reverse();
      for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newRow[i + 1] = 0;
        }
      }
      newRow = newRow.filter(v => v !== 0);
      while (newRow.length < boardSize) newRow.push(0);
      grid[row] = newRow.reverse();
    }
  }

  setTimeout(updateBoard, 100);
}
