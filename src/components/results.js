import React, { Component } from 'react';

class Article extends Component {
  constructor(props){
    super(props);
    // this.saveArticle=this.saveArticle.bind(this);
  }

  // saveArticle(){
  //   // let newArticle = {
  //   //   heading : this.props.heading,
  //   //   link : this.props.link,
  //   //   snippet : this.props.snippet,
  //   //   author : this.props.writer
  //   // }
  //   console.log("Saved Article");
  //   // mongoose post newArticle to MongoDB
  // }

  render(){
    return (
      <div className="article-result">
        {this.props.heading}
        <button className="save-button" /*>onClick="saveArticle"*/ type="button">Save</button>
      </div>
    )
  }
}

class Results extends Component {
  constructor(props) {
    super(props)
  }

  // componentWillReceiveProps(nextProps) {
  //   this.forceUpdate();
  // }

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
              link={item.weblink}
              snippet={item.snippet}
              author={item.writer}
            />
          );
        })}    
      </div>
    );
  }
}

export default Results;