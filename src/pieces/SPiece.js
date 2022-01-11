import Piece from './Piece'
import { PIECE_S_STRUCTURE } from '../consts'

class SPiece extends Piece {
  constructor (p5, board) {
    super(p5, board);

    this.color = p5.color('lightgreen');
    this.structure = PIECE_S_STRUCTURE;
    super.initiateBlocks();
  }
}

export default SPiece
