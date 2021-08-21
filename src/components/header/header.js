import React, { useContext } from 'react';
import '../../css/style.css';
import { Navbar, Alignment, Button } from '@blueprintjs/core';
import { LoginContext } from '../../context/Login-context';
import { Link } from 'react-router-dom';
import Login from '../login/login';

export default function Header() {
  const loginContext = useContext(LoginContext);
  return (
    <>
      <Navbar className='Navbar'>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>To Do</Navbar.Heading>
          <Navbar.Divider />
          <Link to='/'>
            <Button className='bp3-minimal' icon='home' text='Home' />
          </Link>

          <Link to='/settings'>
            <Button className='bp3-minimal' icon='settings' text='Settings' />
          </Link>
          {loginContext.loggedin && <Login></Login>}
        </Navbar.Group>
      </Navbar>
    </>
  );
}
