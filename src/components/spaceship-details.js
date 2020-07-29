import React from 'react';

export const SpaceshipDetails = ({ name, model, props }) => {
  return (
    <div className="spaceship-details">
      <div>Model: {model}</div>
      {props &&
        <React.Fragment>
          <div>Speed: {props.speed}</div>
          <div>Capacity: {props.capacity}</div>
        </React.Fragment>
      }
    </div>
  );
}
