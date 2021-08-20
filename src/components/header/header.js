import React, { Component } from 'react';
import '../../css/style.css';
import { Navbar, Alignment, Button } from '@blueprintjs/core';
export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar className='Navbar'>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>To Do</Navbar.Heading>
            <Navbar.Divider />
            <Button className='bp3-minimal' icon='home' text='Home' />
          </Navbar.Group>
        </Navbar>
      </>
    );
  }
}
