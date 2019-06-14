import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import Smurf from './Smurf';

class Smurfs extends Component {

  render() {
    return (
      <div className="Smurfs">
        <h1>Smurf Village</h1>
        <ul>
          {this.props.smurfs.map(smurf => {
            return (
              <div key={smurf.id}>
              <Smurf
                name={smurf.name}
                id={smurf.id}
                age={smurf.age}
                height={smurf.height}
                key={smurf.id}
              />
              <NavLink to={`/smurfs/${smurf.id}/update`}>Update</NavLink>
              <button onClick={() => this.props.deleteSmurf(smurf.id)}>Delete</button>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

Smurf.defaultProps = {
 smurfs: [],
};

export default Smurfs;
