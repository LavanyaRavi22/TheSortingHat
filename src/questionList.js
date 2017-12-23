import React, { Component } from 'react';
import {db} from './firebase';
import './App.css';
import DisplayResults from './displayResults';

class QuestionList extends Component{
	constructor(){
		super();
		this.state={
			questionsAndOptions : [],			// all questions and options
			questionID : null,					// question ID
			questionNumber:0,					// set to index 0 in the beginning
			question:null,						// Current question
			options:null,						// Current options
			gryffindor:0,
			ravenclaw:0,
			hufflepuff:0,
			slytherin:0,
			selectedOptions : [],				// User selected options	
			endOfQuestions : false		
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
	   //console.log(this.state);
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
			await this.setState({
				endOfQuestions : true
			})
		}

		//console.log(this.state);
	}

	async questionNumberUpdate(){
		await this.setState({
			questionNumber : this.state.questionNumber+1
		})
		console.log(this.state);
	}

	async check() {
		// Answer check
			//console.log(this.state.selectedOptions);
		for(var opt in this.state.selectedOptions)
		{
			//console.log(this.state.selectedOptions[opt]);
			//console.log(this.state.questionsAndOptions[this.state.questionNumber][i]);

			//loop over questionsAndOptions and categorise into the four houses
			for(var i=2;i<=5;i++)
			{
				this.state.questionsAndOptions[this.state.questionNumber][i].map(async (elem) => {
					if(elem === this.state.selectedOptions[opt])
					{
						if(i === 2) 
							await this.setState({
								gryffindor : this.state.gryffindor+1
							});
						else if(i === 3)
							await this.setState({
								hufflepuff : this.state.hufflepuff+1
							});
						else if(i === 4)
							await this.setState({
								ravenclaw : this.state.ravenclaw+1
							});
						else
							await this.setState({
								slytherin : this.state.slytherin+1
							});
					}
				});
			}

		}

		//console.log(this.state);

		// Display next
		this.questionNumberUpdate();				// update question number		
		await this.setState({						// set all current question states to null
			questionID:null,
			question : null,
			options : null,
			selectedOptions : []
		})
		this.questions(this.state.questionNumber);	// call for the next question
	}

	//Manages the selected and unselected options before submitting for checking

	async handleThis(event) {
		//event.preventDefault();		->This makes the double click issue on checkbox
		//event.persist();

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
		
		//console.log(this.state.selectedOptions);
	}

	render(){
		return (
			<div>
				<div className="questionSection">

				 
					{this.state && this.state.question && !this.state.endOfQuestions &&
						<h2 style={{color:"white"}}
						    className="question"> 
						  {this.state.question} 
						</h2> 
					}
					{this.state && !this.state.endOfQuestions && this.state.options && this.state.options.map(option => {
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
					{this.state && !this.state.endOfQuestions && 
						<button onClick={this.check}
					 		className="nextBtn"> Next </button>
					}
					

				</div>
				{this.state && this.state.endOfQuestions &&
					<DisplayResults gryffindor={this.state.gryffindor}
									ravenclaw={this.state.ravenclaw}
									hufflepuff={this.state.hufflepuff}
									slytherin={this.state.slytherin} />
				}
			</div>
		);
	}
}

export default QuestionList;