import React from 'react';
import Card from './Card';
import './App.css';

class BattleGoalsDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      shuffledDeck: [],
      drawnDeck: []
    };
    this.drawCard = this.drawCard.bind(this);
  }
  componentDidMount() {
    fetch(process.env.PUBLIC_URL + '/gloomhaven/data/battle-goals.js')
      .then(res => res.json())
      .then(
        (result) => {
          const deck = result.filter(c => c.name !== 'battlegoal-back');
          this.setState({
            deck: deck,
            shuffledDeck: shuffleDeck(deck),
            drawnDeck: []
          });
        },
        (error) => {
          console.error(error);
        }
      )
  }
  drawCard() {
    const shuffledDeck = this.state.shuffledDeck.length > 0 ?
      this.state.shuffledDeck : shuffleDeck(this.state.deck);

    const drawnDeck = this.state.shuffledDeck.length > 0 ?
      this.state.drawnDeck : [];

    this.setState({
      deck: this.state.deck,
      drawnDeck: [shuffledDeck[0], ...drawnDeck],
      shuffledDeck: [...shuffledDeck.slice(1)]
    });
  }
  render() {
    const drawnCards = this.state.drawnDeck.map((card) =>
      <Card key={card.name} image={process.env.PUBLIC_URL + '/gloomhaven/images/' + card.image } name={card.name} />
    );

    return (
      <div className="flex flex-wrap flex-row">
        <Card
          name="Draw Battle Card"
          onClick={this.drawCard}
          image={process.env.PUBLIC_URL + '/gloomhaven/images/battle-goals/battlegoal-back.png' } />
        {drawnCards}
      </div>
    )
  }
}

// Fisher–Yates shuffle
function shuffleDeck(deck) {
  var newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
  return newDeck;
}

export default BattleGoalsDeck;
