import Block from './Block'

import { CELL_SIZE } from '../consts'

export const getBlocksFromStructure = (structure, xShift, yShift, rotations, color) => {
  const rotationIndex = rotations % structure.length;

  const blocks = [];
  const rotation = structure[rotationIndex];
  const centerY = Math.floor(rotation.length / 2);
  const centerX = Math.floor(rotation[0].length / 2);

  for (let y = 0; y < rotation.length; y++) {
    const cellRelativeY = y - centerY;
    const row = rotation[y];

    for (let x = 0; x < row.length; x++) {
      const cellRelativeX = x - centerX;
      const cell = row[x];

      if (cell === 1) {
        blocks.push(
          new Block(
            (cellRelativeX + xShift) * CELL_SIZE,
            (cellRelativeY + yShift) * CELL_SIZE,
            color
          ),
        )
      }
    }
  }

  return blocks;
}
