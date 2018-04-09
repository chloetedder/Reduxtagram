import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Landing from './Components/Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          </Switch>
      </div>
    );
  }
}

export default App;
