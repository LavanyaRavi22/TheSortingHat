import React, { Component } from 'react';
import './App.css';
import gryffindor from './images/Gryffindor_Crest.png';
import ravenclaw from './images/Ravenclaw_Crest.png';
import hufflepuff from './images/Hufflepuff_Crest.png';
import slytherin from './images/Slytherin_Crest.png';

class DisplayResults extends Component {

	getTotal(g,r,h,s) {
		return (g+r+h+s);
	}

	housePercentage(houseNumber) {
		return Math.ceil((houseNumber/this.getTotal(this.props.gryffindor,this.props.ravenclaw,this.props.hufflepuff,this.props.slytherin))*100)
	}

	render() {

		return (
			<div class="resultSection">
				<div class="gryffindorSection">
					<img src={gryffindor}
						 alt="Gryffindor Crest"
						 className="crestImage" />
					<p className="housePercent  gryffindor"> 
						{this.housePercentage(this.props.gryffindor)}%
					</p>
				</div>
				<div class="ravenclawSection">
					<img src={ravenclaw}
						 alt="Ravenclaw Crest"
						 className="crestImage" />
					<p className="housePercent ravenclaw"> 
						{this.housePercentage(this.props.ravenclaw)}%
					</p>
				</div>
				<div class="hufflepuffSection">
					<img src={hufflepuff}
						 alt="Hufflepuff Crest"
						 className="crestImage" />
					<p className="housePercent hufflepuff"> 
						{this.housePercentage(this.props.hufflepuff)}%
					</p>
				</div>
				<div class="slytherinSection">
					<img src={slytherin}
						 alt="Slytherin Crest"
						 className="crestImage" />
					<p className="housePercent slytherin"> 
						{this.housePercentage(this.props.slytherin)}%
					</p>
				</div>

			</div>
		);
	}
}

export default DisplayResults;