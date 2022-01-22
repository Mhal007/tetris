import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { GAME_MODES } from './consts';
import { GameModeName } from './pieces/types';

import './Settings.scss';

type SettingsProps = {
  gameModeName: GameModeName;
  setGameModeName: (newGameModeName: GameModeName) => void;
};

const options = GAME_MODES.map(gameMode => ({
  text: gameMode.name,
  value: gameMode.name,
  disabled: gameMode.isDisabled,
}));

const Settings = ({ gameModeName, setGameModeName }: SettingsProps) => {
  return (
    <div className="settings-container">
      <p>Piece set:</p>
      <Dropdown
        options={options}
        selection
        value={gameModeName}
        onChange={(event, data) => {
          setGameModeName(data.value as GameModeName);
          // focusing the game
          document.querySelector('canvas')?.click();
        }}
      />
    </div>
  );
};

export default Settings;
