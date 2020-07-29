import React from 'react';
import { ReactComponent as Rocket } from "../svg/rocket.svg";
import { SpaceshipDetails } from "./spaceship-details";

export const Spaceship = (props) => {
  const [isDetails, toggleDetails] = React.useState(false);

  return (
    <div onClick={() => toggleDetails(!isDetails)} className="spaceship">
      <div className="spaceship-title">{props.name}</div>
      <Rocket style={{ fill: "#D35D47" }} />
      {isDetails && <SpaceshipDetails {...props} />}
    </div>
  );
}
