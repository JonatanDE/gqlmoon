import React from 'react';
import './App.css';
import { Spaceship } from "./components/spaceship"
import { BuildSpaceship } from "./components/build-form"

import { useQuery, gql } from '@apollo/client';

const GET_ALL_SPACESHIPS = gql`
  query GetSpaceships {
    spaceships {
      _id
      name
      model
    }
  }
`;

const GET_ALL_SPACESHIPS_FULL_DETAILS = gql`
  query GetSpaceships {
    spaceships {
      _id
      name
      model
      props {
        speed
        capacity
      }
    }
  }
`;

function App() {
  const [isFullDetails, toggleFullDetails] = React.useState(false);
  const { loading, error, data, refetch } = useQuery(
    isFullDetails ? GET_ALL_SPACESHIPS_FULL_DETAILS : GET_ALL_SPACESHIPS
  );

  const toggleAndRefetch = () => {
    toggleFullDetails(!isFullDetails);
    refetch();
  }

  if (loading) {
    return <p>Assembling all spaceships</p>;
  }

  if (error) {
    return <p>Control Center is not responding...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="App-switcher"
          onClick={() => toggleAndRefetch()}>
          Switch to {isFullDetails ? "Short details" : "Full details"}
        </div>
        <div className="App-ships">
          {data.spaceships.map(props => (
            <Spaceship {...props} key={props._id} />
          ))}
        </div>
        <BuildSpaceship />
      </header>
    </div>
  );
}

export default App;
