class Piece {
  constructor () {
    this.blocks = [];
    this.originalPlacement = true;
    this.isPlaced = false;
  }

  setPlaced (newPlaced) {
    this.isPlaced = newPlaced;
  }

  draw () {
    this.blocks.forEach(block => block.draw());
  }

  move () {
    if (this.isPlaced) {
      return;
    }

    this.blocks.forEach(block => {
      block.move()
    });

    this.originalPlacement = false;
  }
}
