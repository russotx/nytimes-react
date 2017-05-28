import React, { Component } from 'react';
import axios from 'axios';

// THE SINGLE ARTICLE COMPONENT
class Article extends Component {
  constructor(props){
    super(props);
    this.saveArticle=this.saveArticle.bind(this);
  }

  saveArticle(){
    let newArticle = {
      author : this.props.author,
      heading : this.props.heading,
      weblink : this.props.weblink,
      pubDate : this.props.pubDate
    }
    console.log(newArticle);
    axios.post('/api/saved/',newArticle)
    .then((res) => console.log('Saved article | server response: ',res))
    .catch((err) => console.log('Error saving article: ',err));
  }

  render(){
    return (
      <div className="article-result">
        <h4>{this.props.heading}</h4>
        <button className="save-button" onClick={this.saveArticle} type="button">Save</button>
      </div>
    )
  }
}

// RENDER THE ARTICLES FROM THE SEARCH RESPONSE
class Results extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    let results = this.props.results;
    console.log("inside results.js, props.results: ",this.props.results);
    console.log("inside results.js, results: ",results);
    return (
      <div className="comp-pane">
        <h3 className="title-box">Results</h3>
        {results.map((item, index) => {
          return (
            <Article
              key={index} 
              heading={item.heading}
              weblink={item.weblink}
              author={item.author}
              pubDate={item.pubDate}
            />
          );
        })}    
      </div>
    );
  }
}

export default Results;