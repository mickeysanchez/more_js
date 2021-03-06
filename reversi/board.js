(function (context) {
  // make Reversi a property of the global context
  var Reversi = context.Reversi = (context.Reversi || {});

  var board = Reversi.Board = new Board();

  function Board() {
    this.rows = newBoard();
  };

  Board.prototype.place_piece = function(pos, color) {
    this.rows[pos[0]][pos[1]] = new Piece(color);
    this.update_rows(pos, color);
  };

  Board.prototype.update_rows = function(pos, color) {
    // flip the pieces over in between pieces of color's color

    // down
    var i = 1;
    var spot = this.rows[pos[0]+i][pos[1]]
    while (spot.color != color) {
      spot.flip();
      i++;
      spot = this.rows[pos[0]+i][pos[1]];
    }
  };

  Board.prototype.display = function() {
    var render = [];
    this.rows.forEach( function(row) {
      row.forEach( function (el) {
        if (el === "_") {
          process.stdout.write("_ ");
        } else if (el.color === "white") {
          process.stdout.write("O ");
        } else {
          process.stdout.write("X ");
        }
      })
      console.log("");
    })
  };

  function newBoard() {
    var a = [];
    for (var i = 0; i < 4; i ++ ) {
      a[i] = [];
      for (var j = 0; j < 4; j ++) {
        a[i][j] = "_";
      }
    }

    a[2][2] = new Piece("white");
    a[1][1] = new Piece("white");
    a[1][2] = new Piece("black");
    a[2][1] = new Piece("black");

    // testing:
    a[2][1] = new Piece("white");
    a[3][1] = new Piece("black");

    return a;
  };

  // PIECES //

  function Piece(color) {
    this.color = color
  };

  Piece.prototype.flip = function() {
    if (this.color === "black") {
      this.color = "white";
    } else {
      this.color = "black";
    }
  };

  board.display();
  // console.log(board.rows);
  board.place_piece([0,1], "black");
  // console.log(board.rows);
  board.display();
})(this);

