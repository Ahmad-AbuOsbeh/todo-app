import React from 'react';
import ReactDOM from 'react-dom';
import SettingsProvider from './context/settings';

import App from './app.js';

class Main extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <App />
      </SettingsProvider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
