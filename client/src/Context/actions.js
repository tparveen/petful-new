import React from 'react';
import { REACT_APP_API_BASE } from '../config';

export const PetfulContext = React.createContext({
  catsQue:null,
  dogsQue: null,
  adoptCat: () => {},
  adoptDog: () => {},
  reseedQ: () => {}
});

export class PetfulProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      catsQue: null,
      dogsQue: null
    }
  }

  componentDidMount() {
    this.catPolling = setInterval(this.pollingCats, 4000)
    this.dogPolling = setInterval(this.pollingDogs, 4000)
  }

  pollingCats=()=>{
    fetch(`${REACT_APP_API_BASE}/cats/queue`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          catsQue: res
        })
      })
  }

  clearCatsPolling=()=>{
    clearInterval(this.catPolling);
  }

  pollingDogs=()=>{
    fetch(`${REACT_APP_API_BASE}/dogs/queue`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          dogsQue: res
        })
      })
  }

  clearDogsPolling=()=>{
    clearInterval(this.dogPolling);
  }

  adoptCat=()=>{
    let cQ = this.state.catsQue;
    cQ[0].adopter = "Thinkful";
    this.setState({
      catsQue: cQ
    });
    fetch(`${REACT_APP_API_BASE}/cats/adopt`,{
      method: 'DELETE'
    })
    .then(res=>{
      if(res.ok) {
        console.log('Cat Adopted by Thinkful Student')        
      }
    })
    .catch(err=>{
      console.log('Error!', err);
    })
  }

  adoptDog=()=>{
    let dQ = this.state.dogsQue;
    dQ[0].adopter = "Thinkful";
    this.setState({
      dogsQue: dQ
    });
    fetch(`${REACT_APP_API_BASE}/dogs/adopt`,{
      method: 'DELETE'
    })
    .then(res=>{
      if(res.ok) {
        console.log('Dog Adopted by Thinkful Student')        
      }
    })
    .catch(err=>{
      console.log('Error!', err);
    })
  }



  render() {
    const pipe = {
      catsQue: this.state.catsQue,
      dogsQue: this.state.dogsQue,
      adoptCat: this.adoptCat,
      adoptDog: this.adoptDog,
      clearCatsPolling: this.clearCatsPolling,
      clearDogsPolling: this.clearDogsPolling,
      reseedQ: this.reseedQ
    }
    return (
      <PetfulContext.Provider value={pipe}>
        {this.props.children}
      </PetfulContext.Provider>
    )
  }
}