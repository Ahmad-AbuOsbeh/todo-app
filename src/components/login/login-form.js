import React, { useContext, useEffect, useState } from 'react';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { LoginContext } from '../../context/Login-context';
import superagent from 'superagent';
import base64 from 'base-64';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
export default function LoginForm(props) {
  const API = 'https://api-js401.herokuapp.com';
  const loginContext = useContext(LoginContext);
  const [user, setuser] = useState({});
  const [signInUser, setsignInUser] = useState({});

  // on Change
  function handleChange(e) {
    setuser({ ...user, [e.target.name]: e.target.value });
  }

  // Sign-UP handler
  async function handleSignup(e) {
    e.preventDefault();

    try {
      const response = await superagent.post(`${API}/signup`, user);

      alert(`successfuly signed up with user name : ${response.body.user.username} \nplease sign in to continue..`);
    } catch (error) {
      console.error('sign up ERROR', error.message);
      alert(`something wrong, check username ! `);
    }
  }

  // useEffect
  useEffect(() => {}, [loginContext.userCapability]);

  // DiD Mount
  useEffect(() => {
    const tokenFromCokie = cookie.load('auth');

    validateToken(tokenFromCokie);
    const capability = cookie.load('capability');
    loginContext.setuserCapability(capability);
  }, []);

  // Sign-IN handler
  async function handleSignin(e) {
    e.preventDefault();
    try {
      const response = await superagent.post(`${API}/signin`).set('authorization', `Basic ${base64.encode(`${user.username}:${Number(user.password)}`)}`);
      loginContext.setuserCapability(response.body.user.acl.capabilities);
      cookie.save('capability', response.body.user.acl.capabilities);

      validateToken(response.body.token);
    } catch (e) {
      console.error('sign in ERROR', e.message);
    }
  }

  // validate token handler
  function validateToken(token) {
    if (token !== 'null' && token !== 'undefined') {
      const userFromDecode = jwt.decode(token);
      setLoginState(true, token, userFromDecode);
    } else {
      setLoginState(false, null, {});
    }
  }

  // setLoginState handler
  function setLoginState(loggedin, token, userFromDecode) {
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
              {/* <option value='writer'>Writer</option> */}
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
