import React from 'react'

import './ScoreBoard.scss';

const ScoreBoard = ({ level, score }) => {
  return (
    <div className="scoreboard-container">
      <div>
        Level: {level}
      </div>
      <div>
        Score: {score}
      </div>
    </div>
  )
}

export default ScoreBoard;
