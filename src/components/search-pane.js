import React, { Component } from 'react';

/*class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state={value:''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  render(){
    return (
      <div className="input-box">
        <label>{this.props.inputTitle}</label>
        <input 
          type={this.props.inputType}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}*/

class SearchPane extends Component {
  constructor(props) {
    super(props)
    this.state = {topic: '', startYear: '', endYear: ''};
    this.showText = this.showText.bind(this);
  }

  showText(event){
    const name = event.target.name;
    this.setState({ [name]: event.target.value});
  }

  render(){
    return (
      <div className="comp-pane">
        <h3 className="title-box">Search</h3>
        <form>
          <label>Topic</label>
          <input name="topic" type="text" value={this.state.topic} onChange={this.showText}/>
          <label>Start Year</label>
          <input name="startYear" type="text" value={this.state.startYear} onChange={this.showText}/>
          <label>End Year</label>
          <input name="endYear" type="text" value={this.state.endYear} onChange={this.showText}/>
        </form>
      </div>
    );
  }
}

export default SearchPane;