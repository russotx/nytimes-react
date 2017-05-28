import React, { Component } from 'react';
import axios from 'axios';

// THE ARTICLE THAT GETS RENDERED FROM THE DB
class DBarticle extends Component {
  constructor(props){
    super(props);
    this.state={
      removed: false
    }
    this.delArticle = this.delArticle.bind(this);
  }

  delArticle(){
    axios.delete('/api/saved',
      { params: {weblink: this.props.weblink}})
      .then((res)=>{
        this.setState({removed:true});
        this.props.killArticle(this.props.id); 
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  render(){
    return (
      <div className={this.state.removed ? "saved-article drop" : "saved-article"}>
        <header className="article-header">
          <h4><a href={this.props.weblink} target="_blank">{this.props.heading}</a></h4>
          <button className="save-button" onClick={this.delArticle} type="button">&#x2716;</button>
        </header>
        <section className="article-details">
          <p className="pub-date">Published: {this.props.pubDate}</p>
        </section>
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
    setTimeout(()=>{this.setState({savedArticles: newState})}, 2000);
  }

  componentDidMount(){
    axios.get('/api/saved')
    .then((res)=>{
      let articles = res.data; 
      this.setState({savedArticles : articles});
    })
    .catch((err)=>{
      console.log('error receiving articles from DB',err);
    })
  }

  render(){
    return(
      <div className="comp-pane">
        <h3 className="title-box">Saved Articles</h3>
          {this.state.savedArticles.map((item, index)=>{
            return (
              <DBarticle
                key={item.weblink}
                id={index}
                heading={item.heading}
                weblink={item.weblink}
                pubDate={item.pubDate}
                killArticle={this.killArticle}
              />
            );
          })}
      </div>
    );
  }
}

export default SavedArticles;