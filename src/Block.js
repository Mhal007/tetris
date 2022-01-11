import { CELL_SIZE } from './const'

class Block {
  constructor (x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw (p5) {
    p5.fill(this.color);
    p5.stroke('black');
    p5.square(this.x, this.y, CELL_SIZE);
  }

  move (p5, direction) {
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
