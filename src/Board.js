import NPiece from './NPiece'
import OPiece from './OPiece'
import IPiece from './IPiece'
import { BASE_SIZE } from './const'

class Board {
  constructor(baseSize) {
    this.baseSize = baseSize;

    this.pieces = [];
    this.shouldSpawnNewPiece = true;

    this.width = 10 * baseSize;
    this.length = 20 * baseSize;
    this.finalYCoordinate = 20 * baseSize;
  }

  advance(p5) {
    p5.background('pink');

    console.log(this.pieces);

    if (this.shouldSpawnNewPiece) {
      this.spawnNewPiece(p5);
    }


    this.pieces.forEach((piece, index) => {
      piece.draw(p5);

      if (!piece.isPlaced) {
        const otherPieces = this.pieces.slice(0, index).concat(
          this.pieces.slice(index + 1, this.pieces.length)
        );

        const wouldOverlap = this.pieceWouldOverlap(piece, otherPieces);
        const reachedBottom = this.pieceReachedBottom(piece);
        const pieceCantMove = wouldOverlap || reachedBottom;

        if (pieceCantMove) {
          piece.setPlaced(true);

          if (piece.originalPlacement) {
            throw new Error('game over');
          }

          this.shouldSpawnNewPiece = true;
        } else {
          piece.move(p5);
        }
      }
    });
  }

  spawnNewPiece(p5) {
    const pieceKinds = ['i', 'n', 'o'];
    const randomizedPiece = pieceKinds[Math.round(Math.random() * (pieceKinds.length - 1))];

    let newPiece;
    switch (randomizedPiece) {
      case 'i':
        newPiece = new IPiece(p5);
        break;
      case 'n':
        newPiece = new NPiece(p5);
        break;
      case 'o':
        newPiece = new OPiece(p5);
        break;
    }

    this.pieces.push(newPiece);
    this.shouldSpawnNewPiece = false;
  }

  pieceReachedBottom(piece) {
    return piece.blocks.some(block => {
      return block.y + BASE_SIZE === this.finalYCoordinate;
    });
  }

  pieceWouldOverlap(piece, otherPieces) {
    return piece.blocks.some(block => {
      return otherPieces.some(otherPiece => {
        return otherPiece.blocks.some(otherBlock => {
          return otherBlock.x === block.x && otherBlock.y === block.y + BASE_SIZE;
        })
      })
    })
  }
}

export default Board;
