import React, { Component } from 'react';
import axios from 'axios';
import Article from './results';

// THE ARTICLE THAT GETS RENDERED FROM THE DB
class DBarticle extends Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.delArticle = this.delArticle.bind(this);
  }

  delArticle(){
    console.log("prop.id ",this.props.id);
    axios.delete('/api/saved',
      { params: {weblink: this.props.weblink}})
      .then((res)=>{
        console.log("res from express: ",res);
        console.log('calling killArticle');
        this.props.killArticle(this.props.id);
      })
      .catch((err)=>{
        console.log("data passed to delArticle ",this.props.weblink);
        console.log(err);
      })
  }

  render(){
    // console.log("the heading: ",this.props.heading)
    console.log(" id in article render = ",this.props.id);
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

// RENDERS ALL THE ARTICLES FROM THE DB 
class SavedArticles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      savedArticles : []
    }
    this.killArticle = this.killArticle.bind(this);
  }

  killArticle(id){
    let newState = this.state.savedArticles;
    newState.splice(id,1);
    console.log('newState = ',newState);
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
            console.log(" index = ",index);
            return (
              <DBarticle
                key={index}
                id={index}
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