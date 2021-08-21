import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Alignment, Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { LoginContext } from '../../context/Login-context';
import superagent from 'superagent';
import base64 from 'base-64';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
export default function LoginForm(props) {
  const API = 'https://api-js401.herokuapp.com';
  const loginContext = useContext(LoginContext);
  const [user, setuser] = useState({});
  const [signUpUser, setsignUpUser] = useState({});
  const [signInUser, setsignInUser] = useState({});

  // on Change
  function handleChange(e) {
    setuser({ ...user, [e.target.name]: e.target.value });
  }

  // Sign-UP handler
  async function handleSignup(e) {
    e.preventDefault();
    console.log(';sign up');

    try {
      console.log('user', user);
      const response = await superagent.post(`${API}/signup`, user);

      console.log('response.body', response.body);
      setsignUpUser({ token: response.body.token, capabilities: response.body.user.acl.capabilities });
    } catch (e) {
      console.error('sign up ERROR', e.message);
    }
  }

  // useEffect
  useEffect(() => {
    console.log('signInUser', signInUser);
  }, [signInUser]);

  // DiD Mount
  useEffect(() => {
    const tokenFromCokie = cookie.load('auth');

    validateToken(tokenFromCokie);
  }, []);

  // Sign-IN handler
  async function handleSignin(e) {
    e.preventDefault();
    console.log(';sign in');
    try {
      console.log('user.passowrd', user.password);
      const response = await superagent.post(`${API}/signin`).set('authorization', `Basic ${base64.encode(`${user.username}:${Number(user.password)}`)}`);
      console.log(response.body);
      validateToken(response.body.token);
    } catch (e) {
      console.error('sign in ERROR', e.message);
    }
  }

  // useEffect(() => {
  //   validateToken(tokenFromCokie);

  // }, [loginContext.loggedin]);

  // validate token handler
  function validateToken(token) {
    if (token !== 'null' && token !== 'undefined') {
      const userFromDecode = jwt.decode(token);
      console.log(token, userFromDecode);
      setLoginState(true, token, userFromDecode);
    } else {
      setLoginState(false, null, {});
    }
  }

  // setLoginState handler
  function setLoginState(loggedin, token, userFromDecode) {
    console.log('loggedin tyyyyyyyype', loggedin, typeof loggedin);
    loginContext.setloggedin(loggedin);
    cookie.save('auth', token);
    setsignInUser(userFromDecode);
  }
  return (
    <>
      <form onSubmit={(handleSignup, handleSignin)}>
        <FormGroup label='User Name' labelFor='text-input'>
          <InputGroup id='text-input' placeholder='enter user name' type='text' onChange={handleChange} name='username' />
        </FormGroup>
        <FormGroup label='Password ' labelFor='text-input'>
          <InputGroup id='text-input' placeholder='enter password' type='password' onChange={handleChange} name='password' />
        </FormGroup>
        <FormGroup label='role :' labelFor='text-input'>
          <div className='bp3-html-select .modifier'>
            <select name='role' onChange={handleChange}>
              <option defaultValue>Select role..</option>
              <option value='admin'>Admin</option>
              <option value='editor'>Editor</option>
              <option value='creator'>Creator</option>
              <option value='user'> User</option>
            </select>
            <span className='bp3-icon bp3-icon-double-caret-vertical'></span>
          </div>
        </FormGroup>
        <Button onClick={handleSignup} className='bp3-minimal' icon='share'>
          Sign up
        </Button>
        <Button onClick={handleSignin} className='bp3-minimal' icon={loginContext.loggedin ? 'log-out' : 'log-in'}>
          {loginContext.loggedin ? 'Logout' : 'Sign in'}
        </Button>
      </form>
    </>
  );
}
