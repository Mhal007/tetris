import React from 'react';
import { Button } from 'semantic-ui-react';

import './Setup.scss';

type SetupProps = {
  isPaused: boolean;
  onPause: () => void;
  onReset: () => void;
  onResume: () => void;
};

const Setup = ({ isPaused, onPause, onReset, onResume }: SetupProps) => {
  return (
    <div className="setup-container">
      <Button disabled={isPaused} primary onClick={onPause}>
        Pause
      </Button>
      <Button disabled={!isPaused} primary onClick={onResume}>
        Resume
      </Button>
      <Button secondary onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};

export default Setup;
