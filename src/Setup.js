import React from 'react'

import './setup.scss';

const Setup = ({ isPaused, onPause, onResume, onReset}) => {
  return (
    <div className="setup-container">
      <button disabled={isPaused} onClick={onPause}>Pause</button>
      <button disabled={!isPaused} onClick={onResume}>Resume</button>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}

export default Setup;
