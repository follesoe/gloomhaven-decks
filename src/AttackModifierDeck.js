import React from 'react';
import { HotKeys } from 'react-hotkeys';
import Draggable from 'react-draggable';
import shuffleDeck from './shuffleDeck';

const keyMap = {
  SHUFFLE: ['s', 'Ctrl+s'],
  DRAW: ['d', 'Ctrl+d']
};

class AttackModifierDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      deck: [],
      shuffledDeck: [],
      drawnDeck: [],
      transform: []
    };

    this.shuffle = this.shuffle.bind(this);
    this.drawCard = this.drawCard.bind(this);

    this.hotkeyHandlers = {
      SHUFFLE: this.shuffle,
      DRAW: this.drawCard
    };
  }
  componentDidMount() {
    fetch(process.env.PUBLIC_URL + '/gloomhaven/data/attack-modifiers.js')
      .then(res => res.json())
      .then(
        (result) => {
          const deck = result
            .filter(c => c.name.match(/am-m-\d+/))
            .map(function(c) {
              return {
                name: c.name,
                image: process.env.PUBLIC_URL + '/gloomhaven/images/' + c.image
              };
            });
          this.setState({
            deck: deck,
            shuffledDeck: shuffleDeck(deck),
            drawnDeck: [],
            transform: deck.map(c => `rotate(${getRandomRotationAngle()}) translateX(${getRandomOffsetX()}) translateY(${getRandomOffsetY()})`)
          });
        },
        (error) => {
          console.error(error);
        }
      )
  }
  shuffle() {
    console.log('Shuffle!');
    const deck = this.state.deck;
    const shuffledDeck = shuffleDeck(deck);
    this.setState({
      deck: deck,
      shuffledDeck: shuffledDeck,
      drawnDeck: [],
      transform: shuffledDeck.map(c => `rotate(${getRandomRotationAngle()}) translateX(${getRandomOffsetX()}) translateY(${getRandomOffsetY()})`)
    });

    console.log(this.state);
  }
  drawCard() {
    const shuffledDeck = this.state.shuffledDeck.length > 0 ?
      this.state.shuffledDeck : shuffleDeck(this.state.deck);

    const drawnDeck = this.state.shuffledDeck.length > 0 ?
      this.state.drawnDeck : [];

    this.setState({
      deck: this.state.deck,
      drawnDeck: [shuffledDeck[0], ...drawnDeck],
      shuffledDeck: [...shuffledDeck.slice(1)],
      transform: this.state.transform
    });

    console.log(this.state);
  }
  render() {
    const cards = this.state.drawnDeck.map((card, i) =>
      <div className="Card Card-shadow Card-anim absolute m-10" key={card.name} style={{
          zIndex: this.state.drawnDeck.length - i,
          transform: this.state.transform[this.state.drawnDeck.length - i]
        }}>
        <img className="Card-face" draggable="false" alt={i} src={card.image} />
      </div>
    );

    const deck = this.state.shuffledDeck.map((card, i) =>
        <div className="Card Card-shadow absolute m-10" key={i} style={{
            zIndex: this.state.shuffledDeck.length - i,
            transform: this.state.transform[this.state.shuffledDeck.length - i]
          }}>
          <img className="Card-face" draggable="false" src={process.env.PUBLIC_URL + '/am-back.png'} alt="Attack Modifier" />
        </div>
    );

    return (
      <HotKeys keyMap={keyMap} handlers={this.hotkeyHandlers}>
        <div className="bg-greenscreen h-screen flex">
          <Draggable defaultPosition={{x: 0, y: 0}} handle=".handle">
            <div className="bg-black flex handle">
              <div className="relative" style={{left: '0px'}}>
                {deck}
              </div>
              <div className="relative" style={{left: '220px'}}>
                {cards}
              </div>
            </div>
          </Draggable>
        </div>
      </HotKeys>
    )
  }
}

function getRandomOffsetX() {
  return getRandom(-5, 5) + 'px';
}

function getRandomOffsetY() {
  return getRandom(-5, 5) + 'px';
}

function getRandomRotationAngle() {
  return getRandom(-5, 20) + 'deg';
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export default AttackModifierDeck;
