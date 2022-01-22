import React from 'react';

import './ScoreBoard.scss';

type ScoreBoardProps = {
  level: number;
  score: number;
};

const ScoreBoard = ({ level, score }: ScoreBoardProps) => {
  return (
    <div className="scoreboard-container">
      <p>Level: {level}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default ScoreBoard;
