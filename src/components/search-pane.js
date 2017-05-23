import React, { Component } from 'react';

class SearchPane extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: "", 
      startYear: "", 
      endYear: "", 
      syValid: true, 
      eyValid: true
    };
    this.showText = this.showText.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.isYearValid = this.isYearValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showText(event){
    const name = event.target.name;
    this.setState({ [name]: event.target.value});
    console.log(this.syValid);
  }

  isYearValid(field, year) {
    const validTag = field === "startYear" ? "syValid" : "eyValid";
    if ((((parseInt(year)).toString()).length != 4) || (year.length > 4)) {
        this.setState({ 
          [field] : "please use YYYY format",
          [validTag] : false
        });
        return false;
    } else {
      this.setState({
        [validTag] : true
      })
      return true;
    }
  }

  handleSubmit(event){
    event.preventDefault();
    const searchTopic = this.state.topic;
    const searchStart = this.state.startYear; 
    const searchEnd = this.state.endYear; 
    let okToProceed = true;
    if (searchStart != ""){
      okToProceed = this.isYearValid("startYear",searchStart);
    }
    if (searchEnd != "") {
      okToProceed = this.isYearValid("endYear",searchEnd);
    }
    if (okToProceed) {
      const criteriaForApp = {
        topic : searchTopic,
        start : searchStart,
        end : searchEnd
      };
      // function form App that updates the criteria in state
      this.props.grabCriteria(criteriaForApp);
    }
  }
  
  render(){
    return (
      <div className="comp-pane">
        <h3 className="title-box">Search</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Topic
          <input 
            name="topic" 
            type="text" 
            value={this.state.topic} 
            onChange={this.showText}/>
          </label>
          <label>Start Year
          <input 
            name="startYear" 
            placeholder="YYYY"
            className={this.state.syValid ? "valid-input" : "invalid-input"} 
            type="number" 
            value={this.state.startYear} 
            onChange={this.showText}/>
          </label>
          <label>End Year
          <input 
            name="endYear" 
            placeholder="YYYY"
            className={this.state.eyValid ? "valid-input" : "invalid-input"} 
            type="number" 
            value={this.state.endYear} 
            onChange={this.showText}/>
          </label>
          <input className="submit-button" name="Submit" type="submit" value="submit"/>
        </form>
      </div>
    );
  }
}

export default SearchPane;