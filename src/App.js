import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Results from './components/results';
import SavedArticles from './components/saved-articles';
import SearchPane from './components/search-pane';
import Nav from './components/nav';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      topic: "", 
      startYear: "", 
      endYear: "",
      results : [],
      freshResults : false 
    }
    this.fetchResults = this.fetchResults.bind(this);   
    this.stateSetter = this.stateSetter.bind(this);
  }

  // isYearVal checks whether a value has been provided for startYear/endYear
  // and 
  isYearVal(yearQuery,queryParam) {
    let yearURLAddin ="";
    if (yearQuery !== "0") {
      yearURLAddin = queryParam;
      yearURLAddin+= yearQuery;
    } 
    return yearURLAddin;
  }

  stateSetter({topic, startYear, endYear, nytQueryed, results, freshResults}, callback){
    this.setState({
      topic : topic !== undefined ? topic : this.state.topic,
      startYear : startYear !== undefined ? startYear : this.state.startYear,
      endYear : endYear !== undefined ? endYear : this.state.endYear,
      results : results !== undefined ? results : this.state.results,
      freshResults : freshResults !== undefined ? freshResults : this.state.freshResults
    },callback);
  }
  
  fetchResults(){
    // build the query URL
    this.results = [];
    const timesAPIkey = "be5cc745c3c94ed9b9e7274a87544151";
    const topic = this.state.topic.trim().split(" ").join("+");
    const startYear = this.state.startYear;
    const endYear = this.state.endYear;
    let addBeginDate = this.isYearVal(startYear,"&begin_date:") + "0101";
    let addEndDate = this.isYearVal(endYear,"&end_date:") + "1231";
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + topic + addBeginDate + addEndDate+"&apikey="+timesAPIkey;
    // submit query via axios
    axios.get(queryURL)
    .then((nyt)=>{
      // cut results to the first 5
      let resArray = nyt.data.response.docs.slice(0,5);
      let newResultState = [];
      resArray.forEach((result) => {
        let article = {};
        let byline = result.byline;
        let headline = result.headline;
        article.heading = headline !== null ? headline.main || "headline not provided" : "headline not provided";
        article.author = byline !== null ? result.byline.original || "author not provided" : "author not provided";
        article.pubDate = result.pub_date || "date not provided";
        article.weblink = result.web_url || "url not provided";
        article.saved = false;
        newResultState.push(article);
      });
      this.setState({topic: "", startYear: "", endYear: "", results: newResultState});
      this.setState({freshResults: true});
    })
    .catch((error)=>{
      console.log(error);
      this.setState({topic: "Search Error."});
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="app-header">
            <h1>New York Times Article Search</h1>
          </div>
          <Nav/>
          <Switch>
            <Route 
              exact path='/' 
              render={() => this.state.freshResults ?
                  <Redirect to='/results' /> :
                  <SearchPane
                    appStateSetter={this.stateSetter}
                    topic={this.state.topic}
                    startYear={this.state.startYear}
                    endYear={this.state.endYear}
                    fetchResults={this.fetchResults} 
                  />} 
            />
            <Route 
              path='/results' 
              render={() => <Results 
                              results={this.state.results}
                              appStateSetter={this.stateSetter}
                            />} 
            />
            <Route path='/saved' component={SavedArticles} />
            <Route render={() => <h3>Page Not Found</h3>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
