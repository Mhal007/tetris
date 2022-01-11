import React from "react";
import Sketch from "react-p5";

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
      } catch {
        p5.noLoop();
        alert('game over')
      }
    }
  };

  const keyPressed = (event) => {
    if (event.key === 'ArrowLeft') {
      board.slidePiece(p5, 'left')
    } else if (event.key === 'ArrowRight') {
      board.slidePiece(p5, 'right')
    }

    console.log('pressed ', key)
  }

  return <Sketch keyPressed={keyPressed} draw={draw} setup={setup} />;
};

export default Engine;
