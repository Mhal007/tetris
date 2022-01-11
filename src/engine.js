import React, { useState } from 'react'
import Sketch from 'react-p5'

import Board from './Board'
import Setup from './Setup'
import { CYCLE, CELL_SIZE, HEIGHT_CELLS, WIDTH_CELLS } from './consts'

let tick = 0;
let board = new Board(CELL_SIZE);
let _P5_;

const Engine = () => {
  const [isPaused, setIsPaused] = useState(false);

  const setup = (p5, canvasParentRef) => {
    _P5_ = p5;
    p5.createCanvas(WIDTH_CELLS * CELL_SIZE, HEIGHT_CELLS * CELL_SIZE).parent(canvasParentRef);
  };

  const draw = (p5) => {
    tick++;

    if (tick % CYCLE === 0) {
      try {
        board.advance(p5);
      } catch (error) {
        p5.noLoop();
        console.error(error);
      }
    }
  };

  const keyPressed = (event) => {
    if (event.key === 'r') {
      onReset();
    } else if (event.key === ' ') {
      if (isPaused) {
        onResume();
      } else {
        onPause();
      }
    }

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
    board = new Board(CELL_SIZE);
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
