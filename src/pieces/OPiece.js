import Block from '../Block'
import Piece from '../Piece'
import { CELL_SIZE, WIDTH_CELLS } from '../const'

class OPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('yellow');

    this.blocks = [
      new Block((Math.ceil(WIDTH_CELLS / 2) - 1) * CELL_SIZE, 0, this.color),
      new Block((Math.ceil(WIDTH_CELLS / 2) - 0) * CELL_SIZE, 0, this.color),
      new Block((Math.ceil(WIDTH_CELLS / 2) - 1) * CELL_SIZE, CELL_SIZE, this.color),
      new Block((Math.ceil(WIDTH_CELLS / 2) - 0) * CELL_SIZE, CELL_SIZE, this.color),
    ]
  }

  rotate (p5) {
    // Nothing
  }
}

export default OPiece
