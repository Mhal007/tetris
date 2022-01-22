import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { GAME_MODES } from './consts';
import { GameModeName } from './pieces/types';

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
    <Dropdown
      value={gameModeName}
      options={options}
      onChange={(event, data) => {
        setGameModeName(data.value as GameModeName);
      }}
    />
  );
};

export default Settings;
