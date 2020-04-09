import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemsDeckTo: 14 };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({itemsDeckTo: parseInt(event.target.value)});
    console.log(this.state.itemsDeckTo);
  }
  render() {
    return (
      <div className="App">
        <header className="m-8">
          <label>
            Available items: 
            <input type="number" min="1" max="164" value={this.state.itemsDeckTo} onChange={this.handleChange} />
          </label>
        </header>
        <ItemsDeck to={this.state.itemsDeckTo} />
        <BattleGoals />
      </div>
    );
  }
}

class BattleGoals extends React.Component {
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
      <Card key={card.name} image={process.env.PUBLIC_URL + 'gloomhaven/images/' + card.image } name={card.name} />
    );

    return (
      <div className="flex flex-wrap flex-row m-6">
        <Card 
          name="Draw Battle Card" 
          onClick={this.drawCard}
          image={process.env.PUBLIC_URL + 'gloomhaven/images/battle-goals/battlegoal-back.png' } />
        {drawnCards}
      </div>
    )
  }
}

class ItemsDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: []
    };
  }
  componentDidMount() {
    fetch(process.env.PUBLIC_URL + '/gloomhaven/data/items.js')
      .then(res => res.json())
      .then(
        (result) => {
          const cards = result
            .filter(card => card.name.match(/item #[1-9]\d{0,3}/))
            .map(function(card) {
              return {
                number: parseInt(card.name.match(/(\d+)/)[0]),
                name: card.name,
                image: process.env.PUBLIC_URL + 'gloomhaven/images/' + card.image
              }
            });
          this.setState({ 
            deck: cards
          });
        },
        (error) => {
          console.error(error);
        }
      )
  }
  render() {
    const cards = this.state.deck.filter(card => card.number <= this.props.to).map((card) =>
      <Card key={card.number} image={card.image} name={card.name} />
    );
    return (
      <div className="flex flex-wrap flex-row m-6">
        {cards}
      </div>
    );
  }
}

function Card(props) {
  function handleClick(e) {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(props.name);
    }
  }
  return (
    <div className="m-2 Card" onClick={handleClick}>
      <img className="Card-face" src={props.image} alt={props.name} />
    </div>
  );
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

export default App;
