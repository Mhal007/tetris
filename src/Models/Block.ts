import { p5InstanceExtensions } from 'p5';

import { CELL_SIZE, CELL_ROUNDING } from '../consts';
import Piece from './Piece';

class Block {
  readonly color: string;
  readonly piece: Piece;

  x: number;
  y: number;

  constructor(piece: Piece, x: number, y: number, color: string) {
    this.piece = piece;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw(p5: p5InstanceExtensions) {
    p5.fill(this.color);
    p5.stroke('black');
    p5.square(this.x, this.y, CELL_SIZE, CELL_ROUNDING);
  }

  move(direction: 'left' | 'right' | 'down') {
    if (direction === 'left') {
      this.x -= CELL_SIZE;
    } else if (direction === 'right') {
      this.x += CELL_SIZE;
    } else if (direction === 'down') {
      this.y += CELL_SIZE;
    } else if (direction === 'up') {
      // Should never happen
      this.y -= CELL_SIZE;
    }
  }
}

export default Block;
