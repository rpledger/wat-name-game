import React, { Component } from 'react';

class Person extends Component {
	render() {
		return (
			<div className="Person">
				<h5>{this.props.name}</h5>
				< br/>
				<img className="img-responsive" alt={this.props.name} src={this.props.imgurl} />
			</div>
		);
	}
}

export default Person;