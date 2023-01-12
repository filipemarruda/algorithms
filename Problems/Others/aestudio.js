// ------------------------------------------------------------
// We have a matrix of 3x3 squares, each one will have a red 
// mark and a white mark. We need to find a solution for the 
// matrix just by moving squares where there are at least 1 red
// mark and 1 white mark in each row and column. The input is 
// an array of arrays, each one with 2 elements, representing 
// the square red and white marks.
// ------------------------------------------------------------

class Square {
    constructor(redmark, whitemark) {
        this.redmark = redmark;
        this.whitemark = whitemark;
    }

    print() {
      for (let row = 0; row < 3; row++) {
        console.log(this.getRow(row));
      }
    }

    getRow(row) {
      return [this.getCharacterAt(row * 2), this.getCharacterAt(row * 2 + 1)];
    }

    getCharacterAt(idx) {
      if (this.redmark === idx && this.whitemark === idx) {
        return '[#]';
      } else if (this.redmark === idx) {
        return '[X]';
      } else if (this.whitemark === idx) {
        return '[O]';
      } else {
        return '[ ]';
      }
    }
}

class Board { 
  constructor() {
    this.squares = [];
  }

  addSquare(square) {
    this.squares.push(square);
  }

  checkRow(row) {
    let red = 0;
    let white = 0;
    
    const boardRowStart = Math.floor(row / 3) * 3;
    const squareRowStart = (row % 3) * 2;

    for (let i = 0; i < 3; i++) {
      const currentSquare = this.squares[i + boardRowStart];
      if (currentSquare.redmark === squareRowStart || currentSquare.redmark === squareRowStart + 1) red++;
      if (currentSquare.whitemark === squareRowStart || currentSquare.whitemark === squareRowStart + 1) white++;
    }
    
    return red > 0 && white > 0;
  }

  checkColumn(column) {
    let red = 0;
    let white = 0;
    
    const boardColumnStart = Math.floor(column / 2);
    const squareColumnStart = (column % 2);

    for (let i = 0; i < 3; i++) {
      const currentSquare = this.squares[i * 3 + boardColumnStart];
      if (currentSquare.redmark === squareColumnStart 
          || currentSquare.redmark === squareColumnStart + 2
          || currentSquare.redmark === squareColumnStart + 4) red++;
      if (currentSquare.whitemark === squareColumnStart 
          || currentSquare.whitemark === squareColumnStart + 2
          || currentSquare.whitemark === squareColumnStart + 4) white++;
    }
    
    return red > 0 && white > 0;
  }

  checkAllRows() {
    for (let i = 0; i < 9; i++) {
      if(!this.checkRow(i)) return false;
    }
    return true;
  }

  checkAllColumns() {
    for (let i = 0; i < 6; i++) {
      if(!this.checkColumn(i)) return false;
    }
    return true;
  }

  check() {
    return this.checkAllRows() && this.checkAllColumns();
  }

  getRow(row) {
    const boardRowStart = Math.floor(row / 3) * 3;
    const squareRowStart = (row % 3);

    return [0,1,2].map(i => this.squares[i + boardRowStart].getRow(squareRowStart).join(' '));
  }

  print() {
    console.log('\n ---------|---------|---------');
    for (let row = 0; row < 9; row++) {
      console.log(`  ${this.getRow(row).join(' | ')}`);
      if(row % 3 === 2) console.log(' ---------|---------|---------');
    }
  }
}

function generateBoard(inputArray) {
  const initialBoard = new Board();
  for (let i = 0; i < inputArray.length; i++) {
    const [ redmark, whitemark ] = inputArray[i];
    initialBoard.addSquare(new Square(redmark, whitemark));
  }
  return initialBoard;
}

function generateAllPossibilities(arr) {
  const result = [];
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }
  permute(arr)
  return result;
}

function solution(inputArray) {
  const inputBoard = generateBoard(inputArray);
  console.log('\n * Initial board:');
  inputBoard.print();
  console.log('\n * Checking all possible boards...');
  console.log('\n * ...');

  const allPossibilities = generateAllPossibilities(inputArray);
  for (let i = 0; i < allPossibilities.length; i++) {
    const currentBoard = generateBoard(allPossibilities[i]);
    if (currentBoard.check()) {
      console.log(`\n * Solution found after test ${i} possibilities:`);
      currentBoard.print();
      return;
    }
  }
  console.log(`\n * Tested ${allPossibilities.length} possibilities and no solution found!`);
}

console.log('\n\n------------------------------------------------------------')
console.log('** #1 Test cases (find a hard solution)');
solution([
  [0, 1], [1, 1], [0, 0],
  [2, 3], [3, 3], [2, 2],
  [4, 5], [5, 5], [4, 4]
]);
console.log('\n\n------------------------------------------------------------')
console.log('** #2 Test cases (find a easy one)');
solution([
  [0, 0], [2, 2], [4, 4],
  [1, 1], [3, 3], [5, 5],
  [0, 1], [2, 3], [4, 5]
]);
console.log('\n\n------------------------------------------------------------')
console.log('** #3 Test cases (do not find a solution, AEs test case)');
solution([
  [2, 1], [3, 3], [4, 5],
  [0, 2], [5, 0], [2, 1],
  [5, 1], [4, 4], [0, 2]
]);