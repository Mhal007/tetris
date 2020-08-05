class Block {
  constructor (x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw () {
    fill(this.color);
    stroke('black');
    square(this.x, this.y, baseSize);
  }

  move () {
    this.y += baseSize;
  }
}
