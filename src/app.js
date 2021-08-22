import React, { useContext } from 'react';
import './css/style.css';
import ToDo from './components/todo/todo.js';
import Header from './components/header/header';
import Form from './context/Form';
import LoginForm from './components/login/login-form';
import { LoginContext } from './context/Login-context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { If, Else, Then } from 'react-if';

export default function App() {
  const logincontext = useContext(LoginContext);
  return (
    <>
      <Router>
        <Header />
        <If condition={logincontext.loggedin}>
          <Then>
            <Switch>
              <Route exact path='/'>
                <ToDo />
              </Route>
              <Route path='/settings'>
                <If condition={logincontext.userCapability > 1}>
                  <Then>
                    <Form />
                  </Then>
                  <Else>
                    <h2>you don't have a permission to control the settings!</h2>
                  </Else>
                </If>
              </Route>
            </Switch>
          </Then>
          <Else>
            <>
              <br /> <LoginForm />
            </>
          </Else>
        </If>
      </Router>
    </>
  );
}
