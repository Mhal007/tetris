import Piece from './Piece'
import { PIECE_I_STRUCTURE } from '../consts'

class IPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('lightblue');
    this.structure = PIECE_I_STRUCTURE;
    super.initiateBlocks();
  }
}

export default IPiece;
