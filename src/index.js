import ReactDOM from 'react-dom';
import React from 'react';

import Engine from './engine'

import 'semantic-ui-css/semantic.min.css'

const App = () => {
  return <Engine />;
}

ReactDOM.render(<App />, document.getElementById('app'));
