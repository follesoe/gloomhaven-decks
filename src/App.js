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
        <header class="m-8">
          <label>
            Available items: 
            <input type="number" min="1" max="164" value={this.state.itemsDeckTo} onChange={this.handleChange} />
          </label>
        </header>
        <ItemsDeck to={this.state.itemsDeckTo} />
      </div>
    );
  }
}

class ItemsDeck extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }
  componentDidMount() {
    fetch(process.env.PUBLIC_URL + 'gloomhaven/data/items.js')
      .then(res => res.json())
      .then(
        (result) => {
          const items = result
            .filter(item => item.name.match(/item #[1-9]\d{0,3}/))
            .map(function(item) {
              return {
                number: parseInt(item.name.match(/(\d+)/)[0]),
                name: item.name,
                image: process.env.PUBLIC_URL + 'gloomhaven/images/' + item.image
              }
            });
          this.setState({ 
            cards: items
          });
        },
        (error) => {
          console.error(error);
        }
      )
  }
  render() {
    const cards = this.state.cards.filter(item => item.number <= this.props.to).map((item) =>
      <Card key={item.number} image={item.image} name={item.name} />
    );
    return (
      <div className="flex flex-wrap flex-row flex-grow flex-shrink">
        {cards}
      </div>
    );
  }
}

function Card(props) {
  return (
    <div className="m-2 Card">
      <img className="Card-face" src={props.image} alt={props.name} />
    </div>
  );
}

export default App;
