import React, { Component } from 'react';
import Results from './components/results';
import SavedArticles from './components/saved-articles';
import SearchPane from './components/search-pane';
import axios from 'axios';

// let results = [];

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      topic: "", 
      startYear: "", 
      endYear: "",
      nytQueryed: false 
    }
    this.results = [];
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

  // componentDidUpdate(){
  //   this.setState({nytQueryed : false});
  // }

  stateSetter({topic, startYear, endYear, nytQueryed}, callback){
    this.setState({
      topic : topic !== undefined ? topic : this.state.topic,
      startYear : startYear !== undefined ? startYear : this.state.startYear,
      endYear : endYear !== undefined ? endYear : this.state.endYear,
      nytQueryed : nytQueryed !== undefined ? nytQueryed : this.state.nytQueryed
    },callback);
//console.log("updated state: ",this.state);
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

      console.log("NYT response ",nyt);
      
      // cut results to the first 5
      let resArray = nyt.data.response.docs.slice(0,5);

      console.log("resArray ",resArray);

      resArray.forEach((result) => {
        let article = {};
        let byline = result.byline;
        let headline = result.headline;
        article.heading = headline !== null ? headline.main || "headline not provided" : "headline not provided";
        article.writer = byline !== null ? result.byline.original || "author not provided" : "author not provided";
        article.pubDate = result.pub_date || "date not provided";
        article.webLink = result.web_url || "url not provided";
        this.results.push(article);
      });
      console.log("end of axios call ",this.results);
      this.setState({nytQueryed : true});
    })
    .catch((error)=>{
      console.log(error);
      // this.setState({topic: "Search Error.", nytQueryed : false});
    });
  }

  // saveIt(article){
  //   let artArray = this.state.savedArticles;
  //   artArray.push(article);
  //   this.setState({savedArticles: artArray});
  // }

  render() {
    console.log("App state = ",this.state);
    return (
      <div className="App">
        <div className="app-header">
          <h1>New York Times Article Scrubber</h1>
          <p>Search for and anotate articles of interest!</p>
        </div>
        <SearchPane
          appStateSetter={this.stateSetter}
          topic={this.state.topic}
          startYear={this.state.startYear}
          endYear={this.state.endYear}
          fetchResults={this.fetchResults}
        />
        <Results 
          results={this.results}
          /*saveTheArticle={this.saveIt}*/
        />
        <SavedArticles
          /*savedArray={this.state.savedArticles}*/
        />
      </div>
    );
  }
}

export default App;
