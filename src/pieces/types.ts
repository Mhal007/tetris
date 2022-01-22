export type PieceSet = {
  type: string;
  color: string;
  structure: Structure;
}[];

export type Structure = StructureRotation[];

type StructureRotation = [
  StructureRow,
  StructureRow,
  StructureRow,
  StructureRow,
  StructureRow,
  StructureRow,
  StructureRow,
];

type StructureRow = [number, number, number, number, number, number, number];
