class NPiece extends Piece {
  constructor () {
    super();

    this.color = color('green');

    this.blocks = [
      new Block(baseSize * 4, 0, this.color),
      new Block(baseSize * 5, 0, this.color),
      new Block(baseSize * 3, baseSize, this.color),
      new Block(baseSize * 4, baseSize, this.color),
    ]
  }
}
