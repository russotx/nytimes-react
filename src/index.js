import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
// import {BrowserRouter as Router} from 'react-router-dom';
// import Results from './components/results';
// import SavedArticles from './components/saved-articles';
// import SearchPane from './components/search-pane';
import './styles/index.css';

ReactDOM.render(
  /*<Router>
    <Router path='/' component={App}>
      <SearchPane/>
      <Results>
        <Route path='/results' component={Article}/>
      </Results>
      <SavedArticles>
        <Route path='/saved' component={Article}/>
      </SavedArticles>
    </Router>
  </Router>, */
  <App/>,
  document.getElementById('root')
);
