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
    length: (this.context.catsQue!==null)?this.context.catsQue.length:1
  }

  static contextType = PetfulContext;

  componentDidUpdate(prevProps, prevState) {
    if(this.context.catsQue !== null) {
      if(prevState.length !== this.context.catsQue.length) {
        this.setState({
          idx: 0,
          length: this.context.catsQue.length
        })
      }
      if(this.context.catsQue.length === 0) {
        this.context.clearCatsPolling()
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
    if(this.state.idx < this.context.catsQue.length-1) {
      this.setState({
        idx: this.state.idx+1
      })
    }
  }


  render() {
    if(this.context.catsQue===null) {
      return (
        <h2>Fetching Cats . . .</h2>
      )
    } else if(!this.context.catsQue.length) {
      return (
        <div className="allAdopted">
          <span role="img" aria-label="heart emoji">️️️❤️</span>
          <h2>No Cats Remaining.</h2>
          <h2>Thanks!</h2>
        </div>
      )
    } else {
      const props = this.context.catsQue[this.state.idx];
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
              disabled={(props.adopter?true:false) || (this.context.catsQue[0].adopter===null?false:true)}
              onClick={() => this.context.adoptCat()}
            >
              {
                (props.adopter)?`Adoption in Process by: ${props.adopter}`:`Let's Home ${props.name}`
              }
            </button>
          </main>
          <Queue que={this.context.catsQue} />
        </section>
      )
    }
  }

}