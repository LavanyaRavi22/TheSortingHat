import React, { Component } from 'react';
import sortingHat from './sortingHat.png';
import './App.css';

//First Page

class SortingPage extends Component{
	render() {
		return(
			<div className="sortingCeremony">
	          <img src={sortingHat} alt="Sorting Hat" className="sortingImage"/>

	          <p className="sorting">There's nothing hidden in your head<br />
	          The Sorting Hat can't see,<br />
	          So try me on and I will tell you<br />
	          Where you ought to be.</p>

	          <p className="sorting">So put me on! Don't be afraid!<br />
	          And don't get in a flap!<br />
	          You're in safe hands (though I have none)<br />
	          For I'm a Thinking Cap!</p>

	          <p className="sorting shadow"
	             onClick={this.props.landingPage}> 
	          	Let the sorting begin! 
	          </p>
	        </div>
		);
	}
}

export default SortingPage;