class OPiece extends Piece {
  constructor () {
    super();

    this.color = color('yellow');

    this.blocks = [
      new Block(baseSize * 4, 0, this.color),
      new Block(baseSize * 5, 0, this.color),
      new Block(baseSize * 4, baseSize, this.color),
      new Block(baseSize * 5, baseSize, this.color),
    ]
  }
}
