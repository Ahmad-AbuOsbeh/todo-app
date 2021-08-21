import React from 'react';
import ReactDOM from 'react-dom';
import SettingsProvider from './context/settings';
import LoginContext from './context/Login-context';

import App from './app.js';

class Main extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <LoginContext>
          <App />
        </LoginContext>
      </SettingsProvider>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
