import React from 'react'
import Sketch from 'react-p5'

import Board from './Board'
import { BASE_SIZE } from './const'

let tick = 0;
let cycle = 3;

const board = new Board(BASE_SIZE);

const Engine = () => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(10 * BASE_SIZE, 20 * BASE_SIZE).parent(canvasParentRef);
  };

  const draw = (p5) => {
    tick++;

    if (tick % cycle === 0) {
      try {
        board.advance(p5);
      } catch (error) {
        p5.noLoop();
        console.error(error);
      }
    }
  };

  const keyPressed = (event) => {
    const fallingPiece = board.getFallingPiece();
    fallingPiece?.onKeyPressed(event.key);
  }

  return <Sketch keyPressed={keyPressed} draw={draw} setup={setup} />;
};

export default Engine;
