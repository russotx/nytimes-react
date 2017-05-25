import React, { Component } from 'react';
import axios from 'axios';
import Article from './results';

class Saved extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

  delArticle(article){
    axios.delete('/api/saved')
      .then((res)=>{

      })
      .catch((err)=>{
        console.log(err);
      })
  }

  render(){
    return (
      <div className="article-result">
        <h4>{this.props.headin}</h4>
        <button className="save-button" onClick={this.delArticle(this.props.article)} type="button">Remove</button>
      </div>
    )
  }
}

class SavedArticles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savedArticles : []
    }
  }

  componentWillMount(){
    axios.get('/api/saved')
    .then((articles)=>{
      this.setState({savedArticles : articles});
    })
    .catch((err)=>{
      console.log('error receiving articles from DB');
    })
  }

  render(){
    return(
      <div className="comp-pane">
        <h3 className="title-box">Saved Articles</h3>
        <div>
          {this.state.articles.map((item, index)=>{
            return (
              <Article
                key={index}
                heading={item.heading}
                link={item.weblink}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SavedArticles;