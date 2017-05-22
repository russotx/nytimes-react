import React, { Component } from 'react';
import Results from './components/results';
import SavedArticles from './components/saved-articles';
import SearchPane from './components/search-pane';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>New York Times Article Scrubber</h1>          
          <p>Search for and anotate articles of interest!</p>
        </div>
        <SearchPane/>
        <Results/>
        <SavedArticles/>
      </div>
    );
  }
}

export default App;
