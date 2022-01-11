import React from 'react'

const ScoreBoard = ({ level, score }) => {

  return (
    <div style={{ fontSize: '1.6em', margin: '2em'}}>
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
