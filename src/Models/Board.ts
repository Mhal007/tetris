import { p5InstanceExtensions } from 'p5';

import { CELL_SIZE, HEIGHT_CELLS } from '../consts';
import { PIECE_SET_STANDARD } from '../pieces/tetrominos';
import Piece from './Piece';

class Board {
  readonly pieces: Piece[];
  readonly onLinesCleared: (linesCleared: number) => void;
  readonly onPiecePlaced: () => void;

  _shouldSpawnNewPiece: boolean;

  constructor(
    onPiecePlaced: () => void,
    onLinesCleared: (linesCleared: number) => void,
  ) {
    this.pieces = [];
    this._shouldSpawnNewPiece = true;
    this.onPiecePlaced = onPiecePlaced;
    this.onLinesCleared = onLinesCleared;
  }

  get shouldSpawnNewPiece() {
    return this._shouldSpawnNewPiece;
  }

  set shouldSpawnNewPiece(newShouldSpawnNewPiece) {
    this._shouldSpawnNewPiece = newShouldSpawnNewPiece;
  }

  advance() {
    if (this.shouldSpawnNewPiece) {
      this.spawnNewPiece();
    }

    const fallingPiece = this.getFallingPiece();
    const pieceHaveMoved = fallingPiece?.fall();
    this.shouldSpawnNewPiece = !pieceHaveMoved;

    if (!pieceHaveMoved) {
      this.onPiecePlaced();
    }

    this.checkForLines();
  }

  checkForLines() {
    const placedPieces = this.pieces.filter(piece => piece.isPlaced);
    const allBlocks = placedPieces.flatMap(piece => piece.blocks);

    let linesCleared = 0;
    for (let y = 0; y < HEIGHT_CELLS; y++) {
      const thisRowBlocks = allBlocks.filter(
        block => block.y === y * CELL_SIZE,
      );

      if (thisRowBlocks.length === 10) {
        thisRowBlocks.forEach(block => {
          block.piece.removeBlock(block.x, block.y);
          // TODO check if it's being removed by the GC
        });

        const allBlocksAbove = allBlocks.filter(
          block => block.y < y * CELL_SIZE,
        );
        allBlocksAbove.forEach(block => block.move('down'));

        linesCleared++;
      }
    }

    if (linesCleared) {
      this.onLinesCleared(linesCleared);
    }
  }

  draw(p5: p5InstanceExtensions) {
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

  spawnNewPiece() {
    const randomizedPiece =
      PIECE_SET_STANDARD[
        Math.round(Math.random() * (PIECE_SET_STANDARD.length - 1))
      ];

    const newPiece = new Piece(
      this,
      randomizedPiece.type,
      randomizedPiece.color,
      randomizedPiece.structure,
    );

    this.pieces.push(newPiece);
    this.shouldSpawnNewPiece = false;
  }
}

export default Board;
