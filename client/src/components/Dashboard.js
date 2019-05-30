import React from 'react';
import './Dashboard.css';

import Cats from './Cats';
import Dogs from './Dogs'

class Dashboard extends React.Component {

  render() {
    return (
      <div className="animals">
        <div className="row">
          <div className="col-6">
            <Cats />
          </div>
          <div className="col-6">
            <Dogs />
          </div>
        </div>
      </div>
    );
  }
}


export default Dashboard;
