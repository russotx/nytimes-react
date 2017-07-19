import React, { Component } from 'react';

class SearchPane extends Component {
  constructor(props) {
    super(props)
    this.syValid = true; 
    this.eyValid = true;
    this.showText = this.showText.bind(this);
    this.isYearValid = this.isYearValid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  // showText updates App state as the user inputs text
  showText(event){
    const name = event.target.name;
    this.props.appStateSetter({ [name]: event.target.value});
  }

  // isYearValid validates the year input data when the user clicks Submit
  isYearValid(field, year) {
    // set validTag to the appropriate tag based on whether startYear/endYear is passed in
    // syValid and eyValid are used to toggle a class to change the background color of
    // the corresponding form field
    const validTag = field === "startYear" ? "syValid" : "eyValid";
    if ((((parseInt(year, 10)).toString()).length !== 4) || (year.length > 4)) {
        this.props.appStateSetter({ 
          [field] : ""
        });
        this[validTag] = false;
        return false;
    } else {
      this[validTag] = true;
      return true;
    }
  }

  // handleSubmit runs when user clicks submit, it validates the year input data
  // requests state update in App and submits a callback to App's setState
  // which runs the API request
  handleSubmit(event){
    event.preventDefault();
    const topic = this.props.topic;
    const startYear = this.props.startYear; 
    const endYear = this.props.endYear; 
    let okToProceed = true;
    if (startYear !== ""){
      okToProceed = this.isYearValid("startYear",startYear);
    }
    // must check if okToProceed is true, if it's false - can't risk reassigning okToProceed to true
    if (okToProceed) {
      if (endYear !== "") {
        okToProceed = this.isYearValid("endYear",endYear);
      }
    } else this.isYearValid("endYear",endYear);
    if (okToProceed) {
      const criteriaForApp = {
        topic : topic,
        startYear : startYear,
        endYear : endYear
      };
      // make sure to update state with the final values and run callback after state is changed
      // this.props.fetchResults triggers an api request to NY Times via App.
      this.props.appStateSetter(criteriaForApp,this.props.fetchResults);

    } 
  }
  
  render(){
    return (
      <div className="comp-pane">
        <h3 className="title-box">Find Articles</h3>
        {/* run handleSubmit on Submit button click */}
        <form onSubmit={this.handleSubmit}>
          <label>Topic
          <input 
            name="topic" 
            type="text" 
            // topic is state of App and passed back here as the value in the form field
            value={this.props.topic} 
            // showText runs a props function from App to update App's state
            onChange={this.showText}/>
          </label>
          <label>Start Year
          <input 
            name="startYear" 
            placeholder="YYYY"
            className={this.syValid ? "valid-input" : "invalid-input"} 
            type="number" 
            value={this.props.startYear} 
            onChange={this.showText}/>
          </label>
          <label>End Year
          <input 
            name="endYear" 
            placeholder="YYYY"
            className={this.eyValid ? "valid-input" : "invalid-input"} 
            type="number"
            value={this.props.endYear} 
            onChange={this.showText}/>
          </label>
          <input className="submit-button" name="Submit" type="submit" value="submit"/>
        </form>
      </div>
    );
  }
}

export default SearchPane;