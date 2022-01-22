import { p5InstanceExtensions } from 'p5';

import { CELL_SIZE, FINAL_Y_COORDINATE, HORIZONTAL_CELLS } from '../consts';
import { Structure } from '../pieces/types';
import { getBlocksFromStructure } from '../utils';
import Block from './Block';
import Board from './Board';

class Piece {
  readonly board: Board;
  readonly color: string;
  readonly structure: Structure;
  readonly type: string;

  blocks: Block[];
  isPlaced: boolean;
  rotations: number;
  xRelative: number;
  yRelative: number;

  constructor(board: Board, type: string, color: string, structure: Structure) {
    this.blocks = [];
    this.board = board;
    this.color = color;
    this.isPlaced = false;
    this.rotations = 0;
    this.structure = structure;
    this.type = type;
    this.xRelative = 0;
    this.yRelative = 0;

    this.blocks = this.generateBlocks();
  }

  static wouldCollide(
    blocks: Block[],
    otherPieces: Piece[],
    whenMovedDown?: boolean,
  ) {
    return blocks.some(block => {
      return otherPieces.some(otherPiece => {
        return otherPiece.blocks.some(otherBlock => {
          return (
            otherBlock.x === block.x &&
            otherBlock.y === block.y + (whenMovedDown ? CELL_SIZE : 0)
          );
        });
      });
    });
  }

  wouldCollideWhenMovedDown() {
    const bottomWallCollision = this.blocks.some(block => {
      return block.y + CELL_SIZE === FINAL_Y_COORDINATE;
    });

    if (bottomWallCollision) {
      return true;
    }

    const otherPieces = this.board.getPlacedPieces();
    const otherPiecesCollision = Piece.wouldCollide(
      this.blocks,
      otherPieces,
      true,
    );

    if (otherPiecesCollision) {
      return true;
    }

    return false;
  }

  wouldCollideWhenRotated(newBlocks: Block[]) {
    const leftWallCollision = newBlocks.some(newBlock => newBlock.x < 0);
    if (leftWallCollision) {
      return true;
    }

    const rightWallCollision = newBlocks.some(
      newBlock => newBlock.x >= HORIZONTAL_CELLS * CELL_SIZE,
    );

    if (rightWallCollision) {
      return true;
    }

    const bottomWallCollision = newBlocks.some(block => {
      return block.y === FINAL_Y_COORDINATE;
    });

    if (bottomWallCollision) {
      return true;
    }

    const otherPieces = this.board.getPlacedPieces();
    const otherPiecesCollision = Piece.wouldCollide(newBlocks, otherPieces);

    if (otherPiecesCollision) {
      return true;
    }

    return false;
  }

  collapse() {
    while (!this.isPlaced) {
      this.fall();
    }

    this.board._shouldSpawnNewPiece = true;
  }

  draw(p5: p5InstanceExtensions) {
    this.blocks.forEach(block => block.draw(p5));
  }

  fall() {
    if (this.isPlaced) {
      console.error('piece is already placed!');
      return false;
    }

    if (this.wouldCollideWhenMovedDown()) {
      this.setPlaced(true);

      if (this.yRelative === 0) {
        throw new Error('game over');
      }

      return false;
    }

    this.blocks.forEach(block => {
      block.move('down');
    });
    this.yRelative += 1;

    return true;
  }

  generateBlocks(afterRotation?: boolean) {
    const xShift = Math.floor(HORIZONTAL_CELLS / 2) + this.xRelative - 1;
    const yShift = this.yRelative - 1;

    return getBlocksFromStructure(this, xShift, yShift, afterRotation);
  }

  onKeyPressed(key: string) {
    switch (key) {
      case 'ArrowLeft': {
        this.slide('left');
        break;
      }
      case 'ArrowRight': {
        this.slide('right');
        break;
      }
      case 'ArrowUp': {
        this.rotate();
        break;
      }
      case 'ArrowDown': {
        this.collapse();
        this.board.onPiecePlaced();
        break;
      }
      default: {
        return;
      }
    }
  }

  removeBlock(blockX: number, blockY: number) {
    this.blocks = this.blocks.filter(
      block => block.x !== blockX || block.y !== blockY,
    );
  }

  rotate() {
    const newBlocks = this.generateBlocks(true);
    if (this.wouldCollideWhenRotated(newBlocks)) {
      return;
    }

    this.rotations += 1;
    this.blocks = newBlocks;
  }

  setPlaced(newPlaced: boolean) {
    this.isPlaced = newPlaced;
  }

  slide(direction: 'left' | 'right') {
    // TODO combine with Board methods

    const otherPiecesBlocks = this.board
      .getPlacedPieces()
      .flatMap(piece => piece.blocks);

    if (direction === 'left') {
      // Border collision detection
      if (this.blocks.some(block => block.x === 0)) {
        return;
      }

      // Other pieces collision detection
      if (
        this.blocks.some(block => {
          return otherPiecesBlocks.some(
            otherPieceBlock =>
              otherPieceBlock.x === block.x - CELL_SIZE &&
              otherPieceBlock.y === block.y,
          );
        })
      ) {
        return;
      }
    } else if (direction === 'right') {
      // Border collision detection
      if (
        this.blocks.some(
          block => block.x === CELL_SIZE * (HORIZONTAL_CELLS - 1),
        )
      ) {
        return;
      }

      // Other pieces collision detection
      if (
        this.blocks.some(block => {
          return otherPiecesBlocks.some(
            otherPieceBlock =>
              otherPieceBlock.x === block.x + CELL_SIZE &&
              otherPieceBlock.y === block.y,
          );
        })
      ) {
        return;
      }
    }

    this.blocks.forEach(block => {
      block.move(direction);
    });

    this.xRelative += direction === 'right' ? 1 : -1;
  }
}

export default Piece;
