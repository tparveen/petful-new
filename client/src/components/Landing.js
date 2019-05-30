import React, { Component } from 'react';
import faker from 'faker';
import './Landing.css';

export default class extends Component {

  render() {
    return (
      <div className="intro">
        <h2>Welcome to</h2>
        <h1>PetFul</h1>
        <p className="description">
          {faker.lorem.paragraphs(6)}
        </p>
        <button 
          className="introDopt"
          onClick={()=>{
            this.props.history.push('/dashboard');
          }}
        >
          Adoptions in Progress!
        </button>
      </div>
    )
  }
}