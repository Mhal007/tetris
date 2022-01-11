class Piece {
  constructor () {
    this.blocks = [];
    this.originalPlacement = true;
    this.isPlaced = false;
  }

  setPlaced (newPlaced) {
    this.isPlaced = newPlaced;
  }

  draw (p5) {
    this.blocks.forEach(block => block.draw(p5));
  }

  move (p5, direction) {
    if (this.isPlaced) {
      return;
    }

    this.blocks.forEach(block => {
      block.move(p5, direction)
    });

    this.originalPlacement = false;
  }
}

export default Piece;
