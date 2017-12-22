import React, { Component } from 'react';
import SortingPage from './sortingPage';
import QuestionList from './questionList';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      landingPage:false
    }
    this.landingPage = this.landingPage.bind(this);
  }

  landingPage(){
    this.setState({landingPage:true});
  }

  render() {
    return (
      <div className="wholePage">
        <h1 className="title"> The Sorting Hat </h1>
        {this.state && !this.state.landingPage &&
          <SortingPage landingPage={this.landingPage}/>   //Display landing page first
        } 
        {this.state && this.state.landingPage &&
          <QuestionList />                                // Listing the questions
        } 
          
      </div>
    );
  }
}

export default App;
