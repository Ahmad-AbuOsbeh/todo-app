import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';

export default function List(props) {
  return (
    <>
      {props.activeList.map((item) => (
        <div className='cardsContainer'>
          <Card interactive={true} elevation={Elevation.TWO} key={item.id} className='card'>
            <p>{item.text}</p>
            <p>
              <small>Assigned to: {item.assignee}</small>
            </p>
            <p>
              <small>Difficulty: {item.difficulty}</small>
            </p>
            <Button onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
          </Card>
          <br />
        </div>
      ))}
    </>
  );
}
