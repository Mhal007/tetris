import Block from './Block'
import Piece from './Piece'
import { BASE_SIZE } from './const'

class NPiece extends Piece {
  constructor (p5) {
    super();

    this.color = p5.color('green');

    this.blocks = [
      new Block(BASE_SIZE * 4, 0, this.color),
      new Block(BASE_SIZE * 5, 0, this.color),
      new Block(BASE_SIZE * 3, BASE_SIZE, this.color),
      new Block(BASE_SIZE * 4, BASE_SIZE, this.color),
    ]
  }
}

export default NPiece
