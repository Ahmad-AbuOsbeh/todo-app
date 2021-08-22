import React, { useContext } from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import { LoginContext } from '../../context/Login-context';

export default function List(props) {
  const logincontext = useContext(LoginContext);
  return (
    <>
      {props.activeList.map((item) => (
        <div className='cardsContainer'>
          <Card interactive={true} elevation={Elevation.TWO} key={item._id} className='card'>
            {logincontext.userCapability.length > 3 && <Button onClick={() => props.deleteItem(item._id)} icon='cross' id='delete-btn'></Button>}
            <p>{item.text}</p>
            <p>
              <small>Assigned to: {item.assignee}</small>
            </p>
            <p>
              <small>Difficulty: {item.difficulty}</small>
            </p>
            {logincontext.userCapability.length > 2 && <Button onClick={() => props.toggleComplete(item._id)}>Complete: {item.complete?.toString()}</Button>}
          </Card>
          <br />
        </div>
      ))}
    </>
  );
}
