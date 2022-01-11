import { CELL_SIZE, FINAL_Y_COORDINATE, WIDTH_CELLS } from '../consts'
import { getBlocksFromStructure } from './utils'

class Piece {
  constructor (p5, board) {
    this.blocks = [];
    this.board = board;
    this.color = p5.color('black');
    this.isPlaced = false;
    this.rotations = 0;
    this.xRelative = 0;
    this.yRelative = 0;
    this.structure = [[[]]];
  }

  collapse (p5) {
    while (!this.isPlaced) {
      this.fall(p5);
    }

    this.board.shouldSpawnNewPiece = true;
  }

  didReachBottom() {
    return this.blocks.some(block => {
      return block.y + CELL_SIZE === FINAL_Y_COORDINATE;
    });
  }

  draw (p5) {
    this.blocks.forEach(block => block.draw(p5));
  }

  fall (p5) {
    if (this.isPlaced) {
      console.error('piece is already placed!')
      return;
    }

    const otherPieces = this.board.getPlacedPieces();
    const wouldOverlap = this.wouldOverlap(otherPieces);
    const reachedBottom = this.didReachBottom();
    const pieceCantMove = wouldOverlap || reachedBottom;

    if (pieceCantMove) {
      this.setPlaced(true);

      if (this.yRelative === 0) {
        throw new Error('game over');
      }
      return false;
    } else {
      this.blocks.forEach(block => {
        block.move(p5, 'down')
      });

      this.yRelative += 1;
      return true;
    }
  }

  initiateBlocks () {
    const xShift = Math.floor(WIDTH_CELLS / 2) + this.xRelative - 1;
    const yShift = this.yRelative;

    this.blocks = getBlocksFromStructure(
      this.structure,
      xShift,
      yShift,
      this.rotations,
      this.color
    );
  }

  onKeyPressed (key) {
    switch (key) {
      case 'ArrowLeft': {
        this.slide(p5, 'left')
        break;
      }
      case 'ArrowRight': {
        this.slide(p5, 'right')
        break;
      }
      case 'ArrowUp': {
        this.rotate(p5)
        break;
      }
      case 'ArrowDown': {
        this.collapse(p5)
        break;
      }
      default: {
        return;
      }
    }
  }

  rotate (p5) {
    this.rotations += 1;
    this.initiateBlocks();
  }

  setPlaced (newPlaced) {
    this.isPlaced = newPlaced;
  }

  slide (p5, direction) {
    this.blocks.forEach(block => {
      block.move(p5, direction)
    });

    this.xRelative += direction === 'right' ? 1 : -1;
  }

  wouldOverlap(otherPieces) {
    return this.blocks.some(block => {
      return otherPieces.some(otherPiece => {
        return otherPiece.blocks.some(otherBlock => {
          return otherBlock.x === block.x && otherBlock.y === block.y + CELL_SIZE;
        })
      })
    })
  }
}

export default Piece;
