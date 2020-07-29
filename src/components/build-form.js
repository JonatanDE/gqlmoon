import React from "react";
import { gql, useMutation } from "@apollo/client";

const BUILD_SPACESHIP = gql`
  mutation BuildSpaceship($input: SpaceshipInput!) {
    buildSpaceship(input: $input) {
      _id
      name
      model
    }
  }
`;

export function BuildSpaceship() {
  let name;
  let model;
  const [buildSpaceship] = useMutation(BUILD_SPACESHIP, {
    update(cache, { data: { buildSpaceship } }) {
      cache.modify({
        fields: {
          spaceships(existingSpaceships = []) {
            const newSpaceshipRef = cache.writeFragment({
              data: buildSpaceship,
              fragment: gql`
                fragment NewSpaceship on Spaceship {
                  _id
                  name
                  model
                }
              `
            });
            return [...existingSpaceships, newSpaceshipRef];
          }
        }
      });
    }
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          buildSpaceship({
            variables: {
              input: {
                name: name.value, model: model.value
              }
            },
          });
          name.value = "";
          model.value = "";
        }}
      >
        <input
          ref={(node) => {
            name = node;
          }}
          placeholder="Name your ship"
          className="input-seperator"
          required
        />
        <select
          ref={(node) => {
            model = node;
          }}
          className="input-seperator"
          required
        >
          <option>Choose a model</option>
          <option value="SR-1">SR-1</option>
          <option value="SR-2">SR-2</option>
        </select>
        <button className="input-seperator" type="submit">
          Build a spaceship
        </button>
      </form>
    </div>
  );
}
