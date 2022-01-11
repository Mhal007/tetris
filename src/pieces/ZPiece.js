import Piece from './Piece'
import { PIECE_Z_STRUCTURE } from '../consts'

class ZPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('green');
    this.structure = PIECE_Z_STRUCTURE;
    super.initiateBlocks();
  }
}

export default ZPiece
