import Block from '../Block'
import Piece from '../Piece'
import { CELL_SIZE, WIDTH_CELLS } from '../const'

class IPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('blue');

    this.blocks = [
      new Block((Math.ceil(WIDTH_CELLS / 2) - 2) * CELL_SIZE, 0, this.color),
      new Block((Math.ceil(WIDTH_CELLS / 2) - 1) * CELL_SIZE, 0, this.color),
      new Block((Math.ceil(WIDTH_CELLS / 2) + 0) * CELL_SIZE, 0, this.color),
      new Block((Math.ceil(WIDTH_CELLS / 2) + 1) * CELL_SIZE, 0, this.color),
    ]
  }

  rotate (p5) {
    if (this.isRotated) {
      this.blocks[0].move(p5, 'left')
      this.blocks[0].move(p5, 'down')

      this.blocks[2].move(p5, 'right')
      this.blocks[2].move(p5, 'up')

      this.blocks[3].move(p5, 'right')
      this.blocks[3].move(p5, 'right')
      this.blocks[3].move(p5, 'up')
      this.blocks[3].move(p5, 'up')

      this.isRotated = false;
    } else {
      this.blocks[0].move(p5, 'right')
      this.blocks[0].move(p5, 'up')

      this.blocks[2].move(p5, 'left')
      this.blocks[2].move(p5, 'down')

      this.blocks[3].move(p5, 'left')
      this.blocks[3].move(p5, 'left')
      this.blocks[3].move(p5, 'down')
      this.blocks[3].move(p5, 'down')

      this.isRotated = true;
    }
  }
}

export default IPiece;
