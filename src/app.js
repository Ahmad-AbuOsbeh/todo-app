import React, { useContext } from 'react';
import './css/style.css';
import ToDo from './components/todo/todo.js';
import Header from './components/header/header';
import Form from './context/Form';
import LoginForm from './components/login/login-form';
import { LoginContext } from './context/Login-context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  const logincontext = useContext(LoginContext);
  return (
    <>
      <Router>
        <Header />
        {!logincontext.loggedin && (
          <>
            <br /> <LoginForm />
          </>
        )}
        {logincontext.loggedin && (
          <Switch>
            <Route exact path='/'>
              <ToDo />
            </Route>
            <Route exact path='/settings'>
              {logincontext.userCapability.length > 1 && <Form />}
            </Route>
          </Switch>
        )}
      </Router>
    </>
  );
}
