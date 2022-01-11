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

  return <Sketch setup={setup} draw={draw} />;
};

export default Engine;
