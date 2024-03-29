import { p5InstanceExtensions } from 'p5';

import {
  BOARD_PADDING,
  CELL_SIZE,
  GAME_MODES,
  HORIZONTAL_CELLS,
  VERTICAL_CELLS,
} from '../consts';
import { GameModeName, PieceSet } from '../pieces/types';
import Piece from './Piece';

class Board {
  readonly pieces: Piece[];
  readonly pieceSet: PieceSet;
  readonly onLinesCleared: (linesCleared: number) => void;
  readonly onPiecePlaced: () => void;

  _shouldSpawnNewPiece: boolean;

  constructor(
    gameModeName: GameModeName,
    onPiecePlaced: () => void,
    onLinesCleared: (linesCleared: number) => void,
  ) {
    this._shouldSpawnNewPiece = true;
    this.pieces = [];

    const gameMode = GAME_MODES.find(
      gameMode => gameMode.name === gameModeName,
    );

    this.pieceSet = gameMode!.pieceSet;

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
    for (let y = 0; y < VERTICAL_CELLS; y++) {
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
    p5.background('black');

    p5.fill('pink');
    p5.rect(
      BOARD_PADDING,
      BOARD_PADDING,
      HORIZONTAL_CELLS * CELL_SIZE,
      VERTICAL_CELLS * CELL_SIZE,
    );

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
      this.pieceSet[Math.round(Math.random() * (this.pieceSet.length - 1))];

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
