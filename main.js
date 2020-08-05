let baseSize;
let board;

function setup() {
  baseSize = 20;
  createCanvas(10 * baseSize, 20 * baseSize);
  board = new Board(baseSize);
}

let tick = 0;
let cycle = 3;

function draw() {
  tick++;

  if (tick % cycle === 0) {
    board.advance();
  }
}
