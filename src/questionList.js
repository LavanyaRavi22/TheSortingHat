import React, { Component } from 'react';
import {db} from './firebase';
import './App.css';

class QuestionList extends Component{
	constructor(){
		super();
		this.state={
			questionsAndOptions : []
		}

	}

	async componentDidMount(){
		await db.collection('questions')
		  .get()
		  .then((q) => {
		  	q.docs.map(async (d,i) => {
		  		console.log(d.data());
		  		await this.setState({
		  			questionsAndOptions : [...[...this.state.questionsAndOptions],
		  									[d.data().question,
		  									 d.data().gryffindor,
		  									 d.data().hufflepuff,
		  									 d.data().ravenclaw,
		  									 d.data().slytherin]]
		  		})
		  		return null;
		  	})
		  });
	   console.log(this.state);
	}

	render(){
		return (
			<div>
				{this.state && this.state.questionsAndOptions.map((qAndA)=>{
					return (
						<p style={{color:"white"}}> {qAndA} </p>
					)

				})}
			</div>
		);
	}
}

export default QuestionList;