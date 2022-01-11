import Block from './Block'
import Piece from './Piece'
import { BASE_SIZE } from './const'

class IPiece extends Piece {
  constructor (p5) {
    super();

    this.color = p5.color('blue');

    this.blocks = [
      new Block(BASE_SIZE * 3, 0, this.color),
      new Block(BASE_SIZE * 4, 0, this.color),
      new Block(BASE_SIZE * 5, 0, this.color),
      new Block(BASE_SIZE * 6, 0, this.color),
    ]
  }
}

export default IPiece;
