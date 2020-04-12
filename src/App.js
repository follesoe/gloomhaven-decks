import React from 'react';
import BattleGoalsDeck from './BattleGoalsDeck';
import Card from './Card';
import './App.css';

class ItemsApp extends React.Component {
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
      <div class="background-map h-screen">
        <header>
          <label>
            Available items:
            <input type="number" min="1" max="164" value={this.state.itemsDeckTo} onChange={this.handleChange} />
          </label>
        </header>
        <ItemsDeck to={this.state.itemsDeckTo} />
        <BattleGoalsDeck />
      </div>
    );
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
                image: process.env.PUBLIC_URL + '/gloomhaven/images/' + card.image
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

export default ItemsApp;
