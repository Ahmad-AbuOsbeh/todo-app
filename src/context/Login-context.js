import React, { useState } from 'react';

export const LoginContext = React.createContext();
export default function Login(props) {
  const [loggedin, setloggedin] = useState(false);
  const [userCapability, setuserCapability] = useState(1);
  const [isUpdated, setIsUpdated] = useState(false);
  return (
    <>
      <LoginContext.Provider value={{ loggedin, setloggedin, userCapability, setuserCapability, isUpdated, setIsUpdated }}>{props.children}</LoginContext.Provider>
    </>
  );
}
