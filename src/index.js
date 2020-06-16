import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Home from './scripts/trivia/components/Home.react';
import Questions from './scripts/trivia/components/Questions.react';
import Results from './scripts/trivia/components/Results.react';
import configureStore from './scripts/trivia/stores/Store';

import './styles/index.scss';

@withRouter
class TriviaApp extends React.Component {
  render() {
    return (
      <div className="index">
        <Switch>
          <Redirect to="/home" from="/" exact />
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/questions">
            <Questions />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

const store = configureStore();

window.onload = function() {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <TriviaApp />
      </Router>
    </Provider>,
    document.getElementById('app')
  );
};
