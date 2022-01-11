import Piece from './Piece'
import { PIECE_L_STRUCTURE } from '../consts'

class LPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('orange');
    this.structure = PIECE_L_STRUCTURE;
    super.initiateBlocks();
  }
}

export default LPiece;
