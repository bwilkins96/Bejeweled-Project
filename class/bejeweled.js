const Screen = require("./screen");
const Cursor = require("./cursor");
const { numRows } = require("./screen");

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    // Initialize this
    this.grid = Bejeweled.setGrid();

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);
    //Screen.setBackgroundColor(0, 0, 'green')

    this.cursor.setBackgroundColor();

    Screen.addCommand('up', 'move cursor up', this.cursor.up);
    Screen.addCommand('down', 'move cursor down', this.cursor.down);
    Screen.addCommand('left', 'move cursor left', this.cursor.left);
    Screen.addCommand('right', 'move cursor up', this.cursor.right);

    Screen.addCommand("w", "swap up", () => {
      let row = this.cursor.row; let col = this.cursor.col;
      if (row === 0) {console.log("You can't do that! :)"); return}
      if (this.grid[row - 1][col] === " ") {console.log("You can't do that! :)"); return}

      let temp = this.grid[row - 1][col];
      this.grid[row - 1][col] = this.grid[row][col];
      this.grid[row][col] = temp;

      Bejeweled.dropRows(this.grid);
      Bejeweled.renderGrid(this.grid);
      Screen.render();

      setTimeout(function() {Bejeweled.processMatches(this.grid)}.bind(this), 500)
      //Bejeweled.processMatches(this.grid);
    })

    Screen.addCommand("a", "swap left", () => {
      let row = this.cursor.row; let col = this.cursor.col;
      if (col === 0) {console.log("You can't do that! :)"); return}

      let temp = this.grid[row][col - 1];
      this.grid[row][col - 1] = this.grid[row][col];
      this.grid[row][col] = temp;

      Bejeweled.dropRows(this.grid);
      Bejeweled.renderGrid(this.grid);
      Screen.render();

      setTimeout(function() {Bejeweled.processMatches(this.grid)}.bind(this), 500)
      //Bejeweled.processMatches(this.grid);
    })

    Screen.addCommand("s", "swap down", () => {
      let row = this.cursor.row; let col = this.cursor.col;
      if (row === this.grid.length - 1) {console.log("You can't do that! :)"); return}
      if (this.grid[row][col] === " ") {console.log("You can't do that! :)"); return}

      let temp = this.grid[row + 1][col];
      this.grid[row + 1][col] = this.grid[row][col];
      this.grid[row][col] = temp;

      Bejeweled.dropRows(this.grid);
      Bejeweled.renderGrid(this.grid);
      Screen.render();

      setTimeout(function() {Bejeweled.processMatches(this.grid)}.bind(this), 1000)
      //Bejeweled.processMatches(this.grid);
    })

    Screen.addCommand("d", "swap right", () => {
      let row = this.cursor.row; let col = this.cursor.col;
      if (col === this.grid[0].length - 1) {console.log("You can't do that! :)"); return}

      let temp = this.grid[row][col + 1];
      this.grid[row][col + 1] = this.grid[row][col];
      this.grid[row][col] = temp;

      Bejeweled.dropRows(this.grid);
      Bejeweled.renderGrid(this.grid);
      Screen.render();

      setTimeout(function() {Bejeweled.processMatches(this.grid)}.bind(this), 500)
      //Bejeweled.processMatches(this.grid);
    })

    /*Screen.addCommand('p', 'show position', () => {
      console.log(`Row: ${this.cursor.row}, Column: ${this.cursor.col}`)
      let row = this.cursor.row;
      let col = this.cursor.col;
      console.log("\nValue: " + this.grid[row][col]);
    });

    Screen.addCommand("c", "show symbol count", () => {
      Bejeweled.checkForMatches(this.grid);
      console.log(this.grid);
    })

    Screen.addCommand("v", "process matches", () => {
      Bejeweled.processMatches(this.grid);
      Bejeweled.renderGrid(this.grid);
      Screen.render();
    })

    Screen.addCommand("x", "drop rows", () => {
      Bejeweled.dropRows(this.grid);
      Bejeweled.renderGrid(this.grid);
      Screen.render();
    }) */

    Bejeweled.renderGrid(this.grid);
    Screen.render();
  }

  static getRandomVowel() {
    const vowels = "aeiouy";

    let randomIdx = Math.floor(Math.random() * vowels.length);

    return vowels[randomIdx];
  }

  static setGrid() {
    let grid = []

    for (let i1 = 0; i1 < 8; i1++) {
      let row = [];

      for (let i2 = 0; i2 < 8; i2++) {

        row.push(Bejeweled.getRandomVowel());
      }

      grid.push(row);
    }

    return grid;
  }

  static renderGrid(grid) {
    grid.forEach( (row, rIdx) => {
      row.forEach( (col, cIdx) => {
        Screen.setGrid(rIdx, cIdx, col);

        if (col === "a") {Screen.setTextColor(rIdx, cIdx, "red")}
        else if (col === "e") {Screen.setTextColor(rIdx, cIdx, "green")}
        else if (col === "i") {Screen.setTextColor(rIdx, cIdx, "white")}
        else if (col === "o") {Screen.setTextColor(rIdx, cIdx, "magenta")}
        else if (col === "u") {Screen.setTextColor(rIdx, cIdx, "blue")}
        else if (col === "y") {Screen.setTextColor(rIdx, cIdx, "yellow")}

      });
    });

  }

  static checkForMatches(grid) {
    const vowels = "aeiouy".split("");
    const counter = {a: 1, e: 1, i: 1, o: 1, u: 1, y: 1 };
    const matchz = [];

    //rows
    grid.forEach( (row, rIdx) => {

      for(let cIdx = 1; cIdx < row.length; cIdx++) {
        let sym = row[cIdx]; let prevIdx = cIdx - 1; let prev = row[prevIdx];

        if (sym === prev && sym !== " ") {counter[sym]++}
        else {
          if (counter[prev] >= 3) {
            matchz.push( {symbol: prev, count: counter[prev], row: rIdx, col: prevIdx, config: "row"} );
          }

          counter[prev] = 1;
        }

        if (sym === prev && cIdx === row.length - 1) {
          if (counter[prev] >= 3) {
            matchz.push( {symbol: prev, count: counter[prev], row: rIdx, col: cIdx, config: "row"} );
          }
        }
      }

      vowels.forEach( v => {counter[v] = 1})
    });

    //columns
    for (let cIdx = 0; cIdx < grid.length; cIdx++) {
      for(let rIdx = 1; rIdx < grid[0].length; rIdx++) {
        let sym = grid[rIdx][cIdx]; let prevIdx = rIdx - 1; let prev = grid[prevIdx][cIdx];

        if (sym === prev && sym !== " ") {counter[sym]++}
        else {
          if (counter[prev] >= 3) {
            matchz.push( {symbol: prev, count: counter[prev], row: prevIdx, col: cIdx, config: "col"} );
          }

          counter[prev] = 1;
        }

        if (sym === prev && rIdx === grid.length - 1) {
          if (counter[prev] >= 3) {
            matchz.push( {symbol: prev, count: counter[prev], row: rIdx, col: cIdx, config: "col"} );
          }
        }
      }

      vowels.forEach( v => {counter[v] = 1})
    }

    if (matchz.length > 0) {
      matchz.forEach( match => console.log(match))
    }

    return matchz;
  }

  static processMatches(grid) {
    const matches = Bejeweled.checkForMatches(grid);
    if (matches.length === 0) {console.log("no matches!"); return}

    matches.forEach( match => {
      let row = match.row; let col = match.col; let count = match.count;
      let symbol = match.symbol; let startIdx;

      //rows
      if (match.config === "row") {
        startIdx = col - count + 1;
        for (let i = startIdx; i <= col; i++) {
          grid[row].splice(i, 1, " ");
        }

      //cols
      } else {
        startIdx = row - count + 1;
        for (let i = startIdx; i <= row; i++) {
          grid[i].splice(col, 1, " ");
        }
      }
    });

    Bejeweled.dropRows(grid);
    Bejeweled.renderGrid(grid);
    setTimeout(function() {Screen.render()}.bind(this), 1000);
    setTimeout(function() {Bejeweled.processMatches(grid)}.bind(this), 1250);
    setTimeout(function() {Bejeweled.checkWin(grid)}.bind(this), 1500);
  }

  static dropRows(grid) {
    let sorted = false;

    while (!sorted) {
      sorted = true;

      for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[0].length - 1; row++ ) {
          let current = grid[row][col]; let next = grid[row + 1][col];

          if (next === " " && current !== " ") {
            grid[row][col] = " ";
            grid[row + 1][col] = current;
            sorted = false;
          }
        }
      }
    }
  }

  static checkWin(grid) {
    const counter = {a: 0, e: 0, i: 0, o: 0, u: 0, y: 0};
    const vowels = "aeiouy";

    grid.forEach(row => {
      row.forEach ( sym => {
        if (vowels.includes(sym)) {counter[sym]++}
      });
    })

    let less = 0; let zero = 0;
    for(let v in counter) {
      if (counter[v] < 3) {less++}
      if (counter[v] === 0) {zero++}
    }

    let points = 20000 + (zero * 5000);
    if (less === 6 && zero !== 6) {
      console.log("\nYou got all possible matches!");
      console.log(`\nPoints: 20000 + (5000 * ${zero} fully cleared vowels) = ${points}`);
      Screen.quit();
    }
    else if (less === 6 && zero === 6) {
      points *= 2;
      console.log("\nYou got all vowels, you are an MVP at this!!!! :)");
      console.log(`\nPoints: (20000 + (5000 * ${zero} fully cleared vowels)) * 2 for getting all vowels = ${points}`)
      Screen.quit();
    }
  }


}

module.exports = Bejeweled;
