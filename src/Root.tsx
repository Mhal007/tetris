import { p5InstanceExtensions } from 'p5';
import React, { useCallback, useEffect, useState } from 'react';
import Sketch from 'react-p5';

import Board from './Models/Board';
import ScoreBoard from './ScoreBoard';
import Settings from './Settings';
import Setup from './Setup';
import {
  BOARD_PADDING,
  CELL_SIZE,
  CYCLE,
  HORIZONTAL_CELLS,
  VERTICAL_CELLS,
} from './consts';
import { GameModeName } from './pieces/types';

import './Root.scss';

let tick = 0;
let timeSinceLastCycle = 0;
let _P5_: p5InstanceExtensions;

const Root = () => {
  const [board, setBoard] = useState<Board | undefined>();
  const [isPaused, setIsPaused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [level, setLevel] = useState(0);
  const [gameModeName, setGameModeName] = useState<GameModeName>('tetrominos');
  const [score, setScore] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [time, setTime] = useState(0);

  const onPiecePlaced = useCallback(() => {
    console.info('piece placed');
  }, []);

  const onLinesCleared = useCallback(
    linesCleared => {
      let pointsScored: number;

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

      setScore(score => score + pointsScored);
    },
    [level],
  );

  const resetBoard = useCallback(() => {
    setBoard(new Board(gameModeName, onPiecePlaced, onLinesCleared));
  }, [gameModeName, onLinesCleared, onPiecePlaced]);

  useEffect(() => {
    resetBoard();
  }, [resetBoard]);

  const setup = (p5: p5InstanceExtensions, canvasParentRef: Element) => {
    _P5_ = p5;
    p5.createCanvas(
      HORIZONTAL_CELLS * CELL_SIZE + BOARD_PADDING * 2,
      VERTICAL_CELLS * CELL_SIZE + BOARD_PADDING * 2,
    ).parent(canvasParentRef);
  };

  const draw = (p5: p5InstanceExtensions) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tick++;
    timeSinceLastCycle++;

    if (timeSinceLastCycle >= CYCLE) {
      try {
        board?.advance();
        timeSinceLastCycle = 0;
      } catch (error) {
        p5.noLoop();
        console.error(error);
      }
    }

    board?.draw(p5);
  };

  const keyPressed = (event: p5InstanceExtensions) => {
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

    const fallingPiece = board?.getFallingPiece();
    fallingPiece?.onKeyPressed(event.key);
  };

  const onPause = () => {
    _P5_?.noLoop();
    setIsPaused(true);
  };

  const onResume = () => {
    _P5_?.loop();
    setIsPaused(false);
  };

  const onReset = () => {
    resetBoard();
    onResume();
  };

  return (
    <div className="root-container">
      <div className="root-content">
        <div className="root-settings">
          <Settings
            gameModeName={gameModeName}
            setGameModeName={setGameModeName}
          />
        </div>
        <div className="root-game">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment -- p5 types misalignment */}
          {/*// @ts-ignore */}
          <Sketch keyPressed={keyPressed} draw={draw} setup={setup} />
        </div>
        <div className="root-stats">
          <ScoreBoard level={level} score={score} />
        </div>
      </div>
      <div className="root-controls">
        <Setup
          isPaused={isPaused}
          onPause={onPause}
          onResume={onResume}
          onReset={onReset}
        />
      </div>
    </div>
  );
};

export default Root;
