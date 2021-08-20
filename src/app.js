import React from 'react';
import './css/style.css';

import ToDo from './components/todo/todo.js';

import Header from './components/header/header';
import Form from './context/Form';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route exact path='/'>
            <ToDo />
          </Route>
          <Route exact path='/settings'>
            <Form />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
