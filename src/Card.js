import React from 'react';
import './App.css';

function Card(props) {
  function handleClick(e) {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(props.name);
    }
  }
  return (
    <div className="m-2 Card Card-pop Card-shadow" onClick={handleClick}>
      <img className="Card-face" src={props.image} alt={props.name} />
    </div>
  );
}

export default Card;
