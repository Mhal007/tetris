import React, { useCallback, useEffect, useState } from 'react'
import Sketch from 'react-p5'

import Board from './Board'
import ScoreBoard from './ScoreBoard'
import Setup from './Setup'
import { CELL_SIZE, CYCLE, HEIGHT_CELLS, WIDTH_CELLS } from './consts'

let tick = 0;
let timeSinceLastCycle = 0;
let _P5_;

const Engine = () => {
  const [board, setBoard] = useState();
  const [isPaused, setIsPaused] = useState(false);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);

  const onPiecePlaced = useCallback(() => {
    console.log('piece placed')
  }, []);

  const onLinesCleared = useCallback((linesCleared) => {
    let pointsScored;

    switch (linesCleared) {
      case 1: {
        pointsScored = 40 * (level + 1);
        break;
      }
      case 2: {
        pointsScored = 100 * (level + 1);
        break;
      }
      case 3: {
        pointsScored = 300 * (level + 1);
        break;
      }
      case 4: {
        pointsScored = 1200 * (level + 1);
        break;
      }
    }

    setScore((score) => score + pointsScored);
  }, []);

  const resetBoard = () => {
    setBoard(
      new Board(onPiecePlaced, onLinesCleared)
    );
  }

  useEffect(() => {
    resetBoard();
  }, [])

  const setup = (p5, canvasParentRef) => {
    _P5_ = p5;
    p5.createCanvas(WIDTH_CELLS * CELL_SIZE, HEIGHT_CELLS * CELL_SIZE).parent(canvasParentRef);
  };

  const draw = (p5) => {
    tick++;
    timeSinceLastCycle++;

    if (timeSinceLastCycle >= CYCLE) {
      try {
        board.advance(p5);
        timeSinceLastCycle = 0;
      } catch (error) {
        p5.noLoop();
        console.error(error);
      }
    }

    board.draw(p5);
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
    } else if (event.key === 'ArrowDown') {
      timeSinceLastCycle = CYCLE;
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
    resetBoard();
    onResume();
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', margin: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Sketch keyPressed={keyPressed} draw={draw} setup={setup} />
          <Setup isPaused={isPaused} onPause={onPause} onResume={onResume} onReset={onReset} />
        </div>
        <div>
          <ScoreBoard level={level} score={score} />
        </div>
      </div>
    </div>
  )
};

export default Engine;
