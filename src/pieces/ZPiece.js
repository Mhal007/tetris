import Block from '../Block'
import Piece from '../Piece'
import { CELL_SIZE, WIDTH_CELLS } from '../const'

class ZPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('green');

    this.blocks = [
      new Block((Math.ceil(WIDTH_CELLS / 2) - 1) * CELL_SIZE, 0, this.color),
      new Block((Math.ceil(WIDTH_CELLS / 2) - 0) * CELL_SIZE, 0, this.color),
      new Block((Math.ceil(WIDTH_CELLS / 2) - 2) * CELL_SIZE, CELL_SIZE, this.color),
      new Block((Math.ceil(WIDTH_CELLS / 2) - 1) * CELL_SIZE, CELL_SIZE, this.color),
    ]
  }

  rotate (p5) {
    if (this.isRotated) {
      this.blocks[1].move(p5, 'right')
      this.blocks[1].move(p5, 'right')
      this.blocks[1].move(p5, 'down')

      this.blocks[2].move(p5, 'down')

      this.isRotated = false;
    } else {
      this.blocks[1].move(p5, 'left')
      this.blocks[1].move(p5, 'left')
      this.blocks[1].move(p5, 'up')

      this.blocks[2].move(p5, 'up')

      this.isRotated = true;
    }
  }
}

export default ZPiece
