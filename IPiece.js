class IPiece extends Piece {
  constructor () {
    super();

    this.color = color('blue');

    this.blocks = [
      new Block(baseSize * 3, 0, this.color),
      new Block(baseSize * 4, 0, this.color),
      new Block(baseSize * 5, 0, this.color),
      new Block(baseSize * 6, 0, this.color),
    ]
  }
}
