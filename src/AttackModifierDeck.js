import React from 'react';
import BattleGoalsDeck from './BattleGoalsDeck';

class AttackModifierDeck extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="bg-greenscreen h-screen">
        <BattleGoalsDeck />
      </div>
      )
  }
}

export default AttackModifierDeck;
