import React, { Component } from 'react';
import axios from 'axios';

// THE SINGLE ARTICLE COMPONENT
class Article extends Component {
  constructor(props){
    super(props);
    this.state={
      saved : false
    }
    this.saveArticle=this.saveArticle.bind(this);
  }

  saveArticle(){
    let newArticle = {
      author : this.props.author,
      heading : this.props.heading,
      weblink : this.props.weblink,
      pubDate : this.props.pubDate
    }
    axios.post('/api/saved/',newArticle)
    .then((res) => { 
      console.log('Saved article | server response: ',res);
      this.setState({saved : true});
    })
    .catch((err) => console.log('Error saving article: ',err));
  }

  render(){
    return (
      <div className={(this.state.saved) ? "article-result saved" : "article-result" }>
        <h4><a href={this.props.weblink} target="_blank">{this.props.heading}</a></h4>
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