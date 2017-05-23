import React, { Component } from 'react';
import Results from './components/results';
import SavedArticles from './components/saved-articles';
import SearchPane from './components/search-pane';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      criteria : {topic: '', start: '', end: ''},
      searchResults : [],
      savedArticles : []
    }
    this.fetchResults = this.fetchResults.bind(this);   
    this.setCriteria = this.setCriteria.bind(this);
    this.saveIt = this.saveIt.bind(this);
  }

  isYearVal(yearQuery,queryParam) {
    let yearURLAddin;
    if (yearQuery != "0") {
      yearURLAddin = queryParam;
      yearURLAddin+= yearQuery;
    } else {
      yearURLAddin = "";
    }
    return yearURLAddin;
  }

  setCriteria(srchOps){
    this.setState({
      criteria: {
        topic: srchOps.topic,
        start: srchOps.start,
        end: srchOps.end
      }
    });
  }

  fetchResults(){
    let searchBox = this.state.criteria.topic;
    let bd = this.state.criteria.start;
    let ed = this.state.criteria.end;
    let addBeginDate = this.isYearVal(bd,"&begin_date:");
    let addEndDate = this.isYearVal(ed,"&end_date:");
    const timesAPIkey = "be5cc745c3c94ed9b9e7274a87544151";
    let queryURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchBox + addBeginDate + addEndDate+"&apikey="+timesAPIkey;
    axios.get(queryURL)
    .then((nyt)=>{
      let resArray = nyt.response.docs;
      let newArrayState = [];
      let article = {};
      for (let i=0;((i < (resArray).length) && (i < 5)); i++) {
        article.heading = resArray[i].headline.main;
        article.writer = resArray[i].byline.original;
        article.snippet = resArray[i].lead_paragraph;
        article.webLink = resArray[i].web_url;
        newArrayState.push(article);
      }
      this.setState({searchResults: newArrayState});
    })
    .catch((error)=>{
      console.log(error);
      this.setState({searchResults: [{heading:"Search Error."}]});
    });
  }

  saveIt(article){
    let artArray = this.state.savedArticles;
    artArray.push(article);
    this.setState({savedArticles: artArray});
  }

  render() {
    return (
      <div className="App">
        <div className="app-header">
          <h1>New York Times Article Scrubber</h1>          
          <p>Search for and anotate articles of interest!</p>
        </div>
        <SearchPane
          grabCriteria={this.setCriteria}
        />
        <Results 
          resultsArray={this.state.searchResults}
          saveTheArticle={this.saveIt}
        />
        <SavedArticles
          savedArray={this.state.savedArticles}
        />
      </div>
    );
  }
}

export default App;
