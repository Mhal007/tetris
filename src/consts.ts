import { PIECE_SET_STANDARD } from './pieces/tetrominos';
import { PIECE_SET_TROMINOS } from './pieces/trominos';

export const WIDTH_CELLS = 10;
export const HEIGHT_CELLS = 20;
export const CELL_SIZE = 20;
export const CYCLE = 50;
export const FINAL_Y_COORDINATE = HEIGHT_CELLS * CELL_SIZE;

export const GAME_MODES = [
  {
    name: 'monominos',
    pieceSet: PIECE_SET_STANDARD,
    isDisabled: true,
  },
  {
    name: 'dominos',
    pieceSet: PIECE_SET_STANDARD,
    isDisabled: true,
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
