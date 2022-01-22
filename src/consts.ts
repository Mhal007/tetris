import { PIECE_SET_DOMINOS } from './pieces/dominos';
import { PIECE_SET_MONOMINOS } from './pieces/monominos';
import { PIECE_SET_STANDARD } from './pieces/tetrominos';
import { PIECE_SET_TROMINOS } from './pieces/trominos';
import { PieceSet } from './pieces/types';

export const HORIZONTAL_CELLS = 10;
export const VERTICAL_CELLS = 20;
export const CELL_SIZE = 28;
export const CYCLE = 50;
export const FINAL_Y_COORDINATE = VERTICAL_CELLS * CELL_SIZE;

export const GAME_MODES = [
  {
    name: 'monominos',
    pieceSet: PIECE_SET_MONOMINOS,
    isDisabled: false,
  },
  {
    name: 'dominos',
    pieceSet: PIECE_SET_DOMINOS,
    isDisabled: false,
  },
  {
    name: 'trominos',
    pieceSet: PIECE_SET_TROMINOS,
    isDisabled: false,
  },
  {
    name: 'tetrominos',
    pieceSet: PIECE_SET_STANDARD,
    isDisabled: false,
  },
  {
    name: 'all mixed',
    pieceSet: [
      ...PIECE_SET_MONOMINOS,
      ...PIECE_SET_DOMINOS,
      ...PIECE_SET_TROMINOS,
      ...PIECE_SET_STANDARD,
    ] as PieceSet,
    isDisabled: false,
  },
  {
    name: 'pentominos',
    pieceSet: PIECE_SET_STANDARD,
    isDisabled: true,
  },
  {
    name: 'hexominos',
    pieceSet: PIECE_SET_STANDARD,
    isDisabled: true,
  },
] as const;
