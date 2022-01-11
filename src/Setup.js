import React from 'react'

const Setup = ({ isPaused, onPause, onResume, onReset}) => {

  return (
    <div style={{ margin: '1em auto' }}>
      <button disabled={isPaused} onClick={onPause}>Pause</button>
      <button disabled={!isPaused} onClick={onResume}>Resume</button>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}

export default Setup;
