import Piece from './Piece'
import { PIECE_O_STRUCTURE } from '../consts'

class OPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('yellow');
    this.structure = PIECE_O_STRUCTURE;
    super.initiateBlocks();
  }
}

export default OPiece
