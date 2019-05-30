import React from 'react';
import './Queue.css';

// "props-drilling" is used here to
// demonstrate component reusability

export default function(props){
  if(!props.que.length) {
    return <h5>Looking for pets...</h5>
  } else {
    const thumbs=props.que.map((v,i)=>(
      <li key={i}>
        <img 
          src={v.imageURL} 
          alt={v.imageDescription}
          className={v.adopter?"adopted":null} 
        />
      </li>
    ))
    return (
      <ul className="petQue">
        {thumbs}
      </ul>
    )
  }
}