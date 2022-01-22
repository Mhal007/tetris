import React from 'react';

import './ScoreBoard.scss';

type ScoreBoardProps = {
  level: number;
  score: number;
};

const ScoreBoard = ({ level, score }: ScoreBoardProps) => {
  return (
    <div className="scoreboard-container">
      <div>Level: {level}</div>
      <div>Score: {score}</div>
    </div>
  );
};

export default ScoreBoard;
