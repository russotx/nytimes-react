import React, { Component } from 'react';

class SearchPane extends Component {
  constructor(props) {
    super(props)
    this.state = {topic: '', startYear: '', endYear: ''};
    this.showText = this.showText.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
  }

  showText(event){
    const name = event.target.name;
    this.setState({ [name]: event.target.value});
  }

  fetchArticles(event){
    const searchTopic = this.state.topic;
    const searchStart = this.state.startYear; 
    const searchEnd = this.state.endYear; 
    console.log(searchTopic);
  }

  render(){
    return (
      <div className="comp-pane">
        <h3 className="title-box">Search</h3>
        <form onSubmit={this.fetchArticles}>
          <label>Topic
          <input name="topic" type="text" value={this.state.topic} onChange={this.showText}/>
          </label>
          <label>Start Year
          <input name="startYear" type="text" value={this.state.startYear} onChange={this.showText}/>
          </label>
          <label>End Year
          <input name="endYear" type="text" value={this.state.endYear} onChange={this.showText}/>
          </label>
          <input className="submit-button" name="Submit" type="submit" value="submit"/>
        </form>
      </div>
    );
  }
}

export default SearchPane;