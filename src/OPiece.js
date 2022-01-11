import Block from './Block'
import Piece from './Piece'
import { BASE_SIZE } from './const'

class OPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('yellow');

    this.blocks = [
      new Block(BASE_SIZE * 4, 0, this.color),
      new Block(BASE_SIZE * 5, 0, this.color),
      new Block(BASE_SIZE * 4, BASE_SIZE, this.color),
      new Block(BASE_SIZE * 5, BASE_SIZE, this.color),
    ]
  }
}

export default OPiece
