import React, { Component } from 'react';
import { PetfulContext } from '../Context/actions';
import Queue from './Queue';
import './Pet.css';

// since Context with functions wasn't covered
// in curric, we're using a class but this
// could be a function

export default class extends Component {

  state = {
    idx: 0,
    length: (this.context.dogsQue!==null)?this.context.dogsQue.length:1
  }

  static contextType = PetfulContext;

  componentDidUpdate(prevProps, prevState) {
    if(this.context.dogsQue !== null) {
      if(prevState.length !== this.context.dogsQue.length) {
        this.setState({
          idx: 0,
          length: this.context.dogsQue.length
        })
      }

      if(this.context.dogsQue.length === 0) {
        this.context.clearDogsPolling()
      }
    }
  }

  left=()=>{
    if(this.state.idx > 0) {
      this.setState({
        idx: this.state.idx-1
      })
    }
  }

  right=()=>{
    if(this.state.idx < this.context.dogsQue.length-1) {
      this.setState({
        idx: this.state.idx+1
      })
    }
  }


  render() {
    if(this.context.dogsQue===null) {
      return (
        <h2>Fetching Dogs . . .</h2>
      )
    } else if(!this.context.dogsQue.length) {
      return (
        <div className="allAdopted">
          <span role="img" aria-label="heart emoji">️️️❤️</span>
          <h2>No Dogs Remaining.</h2>
          <h2>Thanks!</h2>
        </div>
      )
    } else {
      const props = this.context.dogsQue[this.state.idx];
      return (
        <section className="animal">
          <header>
            
            <h2 className="animal-name">
              <i className="left" onClick={this.left}/>
              {props.name}
              <i className="right" onClick={this.right} />
            </h2>
            <img src={props.imageURL} alt={props.imageDescription} />
          </header>
          <main>
            <h3>More about {props.name}</h3>
            <dl className="animal-attributes">
              <dt className="term-sex">Sex</dt>
              <dd className="def-sex">{props.sex}</dd>
              <dt className="term-age">Age</dt>
              <dd className="def-age">{props.age} years</dd>
              <dt className="term-breed">Breed</dt>
              <dd className="def-breed">{props.breed}</dd>
              <dt className="term-story">Story</dt>
              <dd className="def-story">{props.story}</dd>
            </dl>
            <button 
              className="adopter"
              type="button"
              disabled={(props.adopter?true:false) || (this.context.dogsQue[0].adopter===null?false:true)}
              onClick={() => this.context.adoptDog()}
            >
              {
                (props.adopter)?`Adoption in Process by: ${props.adopter}`:`Let's Home ${props.name}`
              }
            </button>
          </main>
          <Queue que={this.context.dogsQue} />
        </section>
      )
    }
  }

}