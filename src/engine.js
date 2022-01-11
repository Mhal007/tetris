import React, { useState } from 'react'
import Sketch from 'react-p5'

import Board from './Board'
import Setup from './Setup'
import { BASE_SIZE } from './const'

let tick = 0;
let cycle = 10;
let board = new Board(BASE_SIZE);
let _P5_;

const Engine = () => {
  const [isPaused, setIsPaused] = useState(false);

  const setup = (p5, canvasParentRef) => {
    _P5_ = p5;
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
    if (isPaused) {
      return;
    }

    const fallingPiece = board.getFallingPiece();
    fallingPiece?.onKeyPressed(event.key);
  }

  const onPause = () => {
    _P5_?.noLoop();
    setIsPaused(true);
  }

  const onResume = () => {
    _P5_?.loop();
    setIsPaused(false);
  }

  const onReset = () => {
    board = new Board(BASE_SIZE);
    onResume();
  }

  return (
    <>
      <Sketch keyPressed={keyPressed} draw={draw} setup={setup} />
      <Setup isPaused={isPaused} onPause={onPause} onResume={onResume} onReset={onReset} />
    </>
  )
};

export default Engine;
