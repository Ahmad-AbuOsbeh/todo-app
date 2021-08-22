import React, { useContext, useEffect } from 'react';
import { LoginContext } from '../../context/Login-context';
import { Button } from '@blueprintjs/core';
import cookie from 'react-cookies';

export default function Login(props) {
  const loginContext = useContext(LoginContext);
  function handleLogout() {
    cookie.save('auth', null);
    loginContext.setloggedin(!loginContext.loggedin);
  }
  useEffect(() => {}, [loginContext.loggedin]);
  return (
    <>
      <Button onClick={handleLogout} className='bp3-minimal' icon={loginContext.loggedin ? 'log-out' : 'log-in'}>
        {loginContext.loggedin ? 'Logout' : 'Login'}
      </Button>
    </>
  );
}
