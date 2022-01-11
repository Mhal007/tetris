import NPiece from './NPiece'
import OPiece from './OPiece'
import IPiece from './IPiece'

class Board {
  constructor(baseSize) {
    this.baseSize = baseSize;

    this.pieces = [];
    this.shouldSpawnNewPiece = true;

    this.width = 10 * baseSize;
    this.length = 20 * baseSize;
  }

  advance(p5) {
    p5.background('pink');

    if (this.shouldSpawnNewPiece) {
      this.spawnNewPiece(p5);
    }

    this.pieces.forEach((piece, index) => {
      piece.draw(p5);

      const pieceIsFalling = !piece.isPlaced;
      if (pieceIsFalling) {
        const result = piece.fall(p5);
        this.shouldSpawnNewPiece = !result;
      }
    });
  }

  getFallingPiece() {
    return this.pieces.find(piece => !piece.isPlaced);
  }

  getPlacedPieces() {
    return this.pieces.filter(piece => piece.isPlaced);
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
        newPiece = new NPiece(p5, this);
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
