import Piece from './Piece'
import { PIECES } from '../pieces/standard'
import { CELL_SIZE, HEIGHT_CELLS } from '../consts'

class Board {
  constructor(onPiecePlaced, onLinesCleared) {
    this.pieces = [];
    this._shouldSpawnNewPiece = true;
    this.onPiecePlaced = onPiecePlaced;
    this.onLinesCleared = onLinesCleared;
  }

  advance (p5) {
    if (this.shouldSpawnNewPiece) {
      this.spawnNewPiece(p5);
    }

    const fallingPiece = this.getFallingPiece();
    const pieceHaveMoved = fallingPiece?.fall();
    this.shouldSpawnNewPiece = !pieceHaveMoved;

    if (!pieceHaveMoved) {
      this.onPiecePlaced();
    }

    this.checkForLines();
  }

  checkForLines () {
    const placedPieces = this.pieces.filter(piece => piece.isPlaced);
    const allBlocks = placedPieces.flatMap(piece => piece.blocks);

    let linesCleared = 0;
    for (let y = 0; y < HEIGHT_CELLS; y++) {
      const thisRowBlocks = allBlocks.filter(block => block.y === y * CELL_SIZE);

      if (thisRowBlocks.length === 10) {
        thisRowBlocks.forEach(block => {
          block.piece.removeBlock(block.x, block.y);
          // TODO check if it's being removed by the GC
        });

        const allBlocksAbove = allBlocks.filter(block => block.y < y * CELL_SIZE);
        allBlocksAbove.forEach(block => block.move('down'))

        linesCleared++;
      }
    }

    if (linesCleared) {
      this.onLinesCleared(linesCleared);
    }
  }

  draw(p5) {
    p5.background('pink');

    this.pieces.forEach(piece => {
      piece.draw(p5);
    });
  }

  getFallingPiece() {
    return this.pieces.find(piece => !piece.isPlaced);
  }

  getPlacedPieces() {
    return this.pieces.filter(piece => piece.isPlaced);
  }

  get shouldSpawnNewPiece () {
    return this._shouldSpawnNewPiece;
  }

  set shouldSpawnNewPiece (newShouldSpawnNewPiece) {
    this._shouldSpawnNewPiece = newShouldSpawnNewPiece;
  }

  spawnNewPiece(p5) {
    const randomizedPiece = PIECES[Math.round(Math.random() * (PIECES.length - 1))];
    const newPiece = new Piece(p5, this, randomizedPiece.type, randomizedPiece.color, randomizedPiece.structure);

    this.pieces.push(newPiece);
    this.shouldSpawnNewPiece = false;
  }
}

export default Board;
