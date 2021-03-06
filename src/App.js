import React, { Component } from 'react';
import MovieFinder from './containers/MovieFinder';
import { Main } from './components/styles';

class App extends Component {
  render() {
    return (
      <Main>
        <MovieFinder />
      </Main>
    );
  }
}

export default App;
