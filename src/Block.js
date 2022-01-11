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

  move (p5, direction) {
    console.log('p5', p5);
    console.log('direction', direction);

    if (direction === 'left') {
      this.x -= BASE_SIZE;
    } else if (direction === 'right') {
      this.x += BASE_SIZE;
    } else if (direction === 'down') {
      this.y += BASE_SIZE;
    }
  }
}

export default Block;
