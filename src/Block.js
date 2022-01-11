import { BASE_SIZE } from './const'

class Block {
  constructor (x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw (p5) {
    p5.fill(this.color);
    p5.stroke('black');
    p5.square(this.x, this.y, BASE_SIZE);
  }

  move () {
    this.y += BASE_SIZE;
  }
}

export default Block;
