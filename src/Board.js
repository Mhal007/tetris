import ZPiece from './pieces/ZPiece'
import OPiece from './pieces/OPiece'
import IPiece from './pieces/IPiece'

class Board {
  constructor() {
    this.pieces = [];
    this._shouldSpawnNewPiece = true;
  }

  advance (p5) {
    if (this.shouldSpawnNewPiece) {
      this.spawnNewPiece(p5);
    }

    const fallingPiece = this.getFallingPiece();
    const result = fallingPiece.fall();
    this.shouldSpawnNewPiece = !result;
  }

  draw(p5) {
    p5.background('pink');

    this.pieces.forEach((piece, index) => {
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
    const pieceKinds = ['i', 'n', 'o'];
    const randomizedPiece = pieceKinds[Math.round(Math.random() * (pieceKinds.length - 1))];

    let newPiece;
    switch (randomizedPiece) {
      case 'i':
        newPiece = new IPiece(p5, this);
        break;
      case 'n':
        newPiece = new ZPiece(p5, this);
        break;
      case 'o':
        newPiece = new OPiece(p5, this);
        break;
    }

    this.pieces.push(newPiece);
    this.shouldSpawnNewPiece = false;
  }
}

export default Board;