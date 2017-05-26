import React, { Component } from 'react';
import axios from 'axios';
import Article from './results';

class DBarticle extends Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.delArticle = this.delArticle.bind(this);
  }

  delArticle(){
    axios({
      method: 'delete',
      url: '/api/saved',
      data: this.props.weblink
    })
      .then((res)=>{
        this.props.killArticle(this.props.key);
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  render(){
    // console.log("the heading: ",this.props.heading)
    return (
      <div className="article-result">
        <p>{this.props.date}</p>
        <h4>{this.props.heading}</h4>
        <button className="save-button" onClick={this.delArticle} type="button">Remove</button>
        <p>{this.props.weblink}</p>
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
    this.killArticle.bind(this);
  }

  killArticle(key){
    let newState = this.state.savedArticles.splice(key,1);
    this.setState({savedArticles: newState});
  }

  componentDidMount(){
    axios.get('/api/saved')
    .then((res)=>{
      let articles = res.data; 
      this.setState({savedArticles : articles});
      console.log(this.state);
    })
    .catch((err)=>{
      console.log('error receiving articles from DB',err);
    })
  }

  render(){
    console.log("savedArticles: ",this.state.savedArticles);
    console.log("state: ",this.state);
    return(
      <div className="comp-pane">
        <h3 className="title-box">Saved Articles</h3>
          {this.state.savedArticles.map((item, index)=>{
            return (
              <DBarticle
                key={index}
                heading={item.heading}
                weblink={item.weblink}
                date={item.date}
                killArticle={this.killArticle}
              />
            );
          })}
      </div>
    );
  }
}

export default SavedArticles;