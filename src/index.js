import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './index.css';
import ItemsApp from './App';
import AttackModifierDeck from './AttackModifierDeck';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path={process.env.PUBLIC_URL + '/monster'}>
        <AttackModifierDeck type="monster" />
      </Route>
      <Route path='/monster'>
        <AttackModifierDeck type="monster" />
      </Route>
      <Route exact path='/'>
        <ItemsApp />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
