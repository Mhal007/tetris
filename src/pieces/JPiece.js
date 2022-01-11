import Piece from './Piece'
import { PIECE_J_STRUCTURE } from '../consts'

class JPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('blue');
    this.structure = PIECE_J_STRUCTURE;
    super.initiateBlocks();
  }
}

export default JPiece;
