import React, { useContext, useEffect } from 'react';
import { LoginContext } from '../../context/Login-context';
import { Navbar, Alignment, Button } from '@blueprintjs/core';
import cookie from 'react-cookies';

export default function Login(props) {
  const loginContext = useContext(LoginContext);
  function handleLogout() {
    console.log('loginContext.loggedin, type oflllllllllllllllllll', loginContext.loggedin, typeof loginContext.loggedin);
    cookie.save('auth', null);
    // cookie.clear();
    loginContext.setloggedin(!loginContext.loggedin);
  }
  useEffect(() => {
    console.log('loginContext.loggedin, type offfffffffffffffffffff', loginContext.loggedin, typeof loginContext.loggedin);
  }, [loginContext.loggedin]);
  return (
    <>
      <Button onClick={handleLogout} className='bp3-minimal' icon={loginContext.loggedin ? 'log-out' : 'log-in'}>
        {loginContext.loggedin ? 'Logout' : 'Login'}
      </Button>
    </>
  );
}
