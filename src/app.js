import React from 'react';
import './css/style.css';

import ToDo from './components/todo/todo.js';
import SettingsProvider from './context/settings';
import Header from './components/header/header';

export default class App extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <Header />
        <ToDo />
      </SettingsProvider>
    );
  }
}
