import Piece from './Piece'
import { PIECE_T_STRUCTURE } from '../consts'

class TPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('violet');
    this.structure = PIECE_T_STRUCTURE;
    super.initiateBlocks();
  }
}

export default TPiece
