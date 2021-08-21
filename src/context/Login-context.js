import React, { useState } from 'react';

export const LoginContext = React.createContext();
export default function Login(props) {
  const [loggedin, setloggedin] = useState(false);
  const [user, setuser] = useState({});
  return (
    <>
      <LoginContext.Provider value={{ loggedin, setloggedin, user, setuser }}>{props.children}</LoginContext.Provider>
    </>
  );
}
