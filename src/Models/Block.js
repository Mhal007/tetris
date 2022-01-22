import { CELL_SIZE } from '../consts'

class Block {
  constructor (piece, x, y, color) {
    this.piece = piece;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw (p5) {
    p5.fill(this.color);
    p5.stroke('black');
    p5.square(this.x, this.y, CELL_SIZE);
  }

  move (direction) {
    if (direction === 'left') {
      this.x -= CELL_SIZE;
    } else if (direction === 'right') {
      this.x += CELL_SIZE;
    } else if (direction === 'down') {
      this.y += CELL_SIZE;
    } else if (direction === 'up') {
      // Used for rotation only
      this.y -= CELL_SIZE;
    }
  }
}

export default Block;
