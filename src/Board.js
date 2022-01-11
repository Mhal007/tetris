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

    console.log(this.pieces);

    if (this.shouldSpawnNewPiece) {
      this.spawnNewPiece(p5);
    }

    this.pieces.forEach((piece, index) => {
      piece.draw(p5);

      const pieceIsFalling = !piece.isPlaced;
      if (pieceIsFalling) {
        const otherPieces = this.pieces.slice(0, index).concat(
          this.pieces.slice(index + 1, this.pieces.length)
        );

        const result = piece.fall(p5, otherPieces);
        this.shouldSpawnNewPiece = !result;
      }
    });
  }

  getFallingPiece() {
    return this.pieces.find(piece => !piece.isPlaced);
  }

  spawnNewPiece(p5) {
    const pieceKinds = ['i', 'n', 'o'];
    const randomizedPiece = pieceKinds[Math.round(Math.random() * (pieceKinds.length - 1))];

    let newPiece;
    switch (randomizedPiece) {
      case 'i':
        newPiece = new IPiece(p5);
        break;
      case 'n':
        newPiece = new NPiece(p5);
        break;
      case 'o':
        newPiece = new OPiece(p5);
        break;
    }

    this.pieces.push(newPiece);
    this.shouldSpawnNewPiece = false;
  }
}

export default Board;
