import { BASE_SIZE, FINAL_Y_COORDINATE } from './const'

class Piece {
  constructor (p5, board) {
    this.board = board;
    this.blocks = [];
    this.originalPlacement = true;
    this.isPlaced = false;
  }

  collapse (p5) {
    while (!this.isPlaced) {
      this.fall(p5);
    }

    this.board.setShouldSpawnNewPiece(true);
  }

  didReachBottom() {
    return this.blocks.some(block => {
      return block.y + BASE_SIZE === FINAL_Y_COORDINATE;
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

      if (this.originalPlacement) {
        throw new Error('game over');
      }
      return false;
    } else {
      this.blocks.forEach(block => {
        block.move(p5, 'down')
      });

      this.originalPlacement = false;
      return true;
    }
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

  }

  setPlaced (newPlaced) {
    this.isPlaced = newPlaced;
  }

  slide (p5, direction) {
    this.blocks.forEach(block => {
      block.move(p5, direction)
    });
  }

  wouldOverlap(otherPieces) {
    return this.blocks.some(block => {
      return otherPieces.some(otherPiece => {
        return otherPiece.blocks.some(otherBlock => {
          return otherBlock.x === block.x && otherBlock.y === block.y + BASE_SIZE;
        })
      })
    })
  }
}

export default Piece;
