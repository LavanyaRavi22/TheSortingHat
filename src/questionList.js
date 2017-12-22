import React, { Component } from 'react';
import {db} from './firebase';
import './App.css';

class QuestionList extends Component{
	constructor(){
		super();
		this.state={
			questionsAndOptions : [],			// all questions and options
			questionID : null,					// question ID
			questionNumber:0,					//set to index 0 in the beginning
			question:null,						// Current question
			options:null,						// Current options
			gryffindor:0,
			ravenclaw:0,
			hufflepuff:0,
			slytherin:0,
			selectedOptions : []						
		}
		this.questions = this.questions.bind(this);
		this.questionNumberUpdate=this.questionNumberUpdate.bind(this);
		this.check = this.check.bind(this);
		this.handleThis = this.handleThis.bind(this);
	}

	async componentDidMount(){
		//Gets all the Questions and Options from the database into questionsAndOptions
		await db.collection('questions')
		  .get()
		  .then((q) => {
		  	q.docs.map(async (d,i) => {
		  		console.log(d.data());
		  		await this.setState({
		  			questionsAndOptions : [...[...this.state.questionsAndOptions],
		  									[d.data().id,
		  									 d.data().question,
		  									 d.data().gryffindor,
		  									 d.data().hufflepuff,
		  									 d.data().ravenclaw,
		  									 d.data().slytherin]],
		  			
		  		})
		  		return null;
		  	})
		  });
	   console.log(this.state);
	   this.questions(this.state.questionNumber);		//calls for the first question
	}

	async questions(index) {							// sets the state for the current question
		if(index < this.state.questionsAndOptions.length)
		{
			await this.setState({
				questionID:this.state.questionsAndOptions[index][0],
				question : this.state.questionsAndOptions[index][1],
				options : [...this.state.questionsAndOptions[index][2],
						   ...this.state.questionsAndOptions[index][3],
						   ...this.state.questionsAndOptions[index][4],
						   ...this.state.questionsAndOptions[index][5]]
			})
		}
		else
		{
			console.log("The end of questions");
		}

		console.log(this.state);
	}

	async questionNumberUpdate(){
		await this.setState({
			questionNumber : this.state.questionNumber+1
		})
		console.log(this.state);
	}

	async check() {
		// Answer check
		

		// Display next
		this.questionNumberUpdate();				// update question number		
		await this.setState({						// set all current question states to null
			questionID:null,
			question : null,
			options : null
		})
		this.questions(this.state.questionNumber);	// call for the next question
	}

	//Manages the selected and unselected options before submitting for checking

	async handleThis(event) {
		event.preventDefault();
		event.persist();

		// adds into the selectedOptions array if it is checked

		if(event.target.checked === true)
		{
			await this.setState({
				selectedOptions : [...this.state.selectedOptions,event.target.value]
			});
		}
		// removes from the selectedOptions array if it is unchecked
		else
		{
			await this.setState({
				selectedOptions : [...this.state.selectedOptions.slice(0,this.state.selectedOptions.indexOf(event.target.value)),
								   ...this.state.selectedOptions.slice(this.state.selectedOptions.indexOf(event.target.value)+1,this.state.selectedOptions.length)]
			});
		}
		
		console.log(this.state.selectedOptions);
	}

	render(){
		return (
			<div className="questionSection">
				{this.state && this.state.question &&
					<h2 style={{color:"white"}}
					    className="question"> 
					  {this.state.question} 
					</h2> 
				}
				{this.state && this.state.options && this.state.options.map(option => {
					return (
						<div>
							<input type="checkbox"
								   value={option} 
								   onChange={(event) =>this.handleThis(event)}
								   className="options"/>
							<label className="optionsValue">{option}</label>
						</div>
					)
				})}
				<button onClick={this.check}
				 		className="nextBtn"> Next </button>
					
			</div>
		);
	}
}

export default QuestionList;