import React, { Component } from 'react';

class Person extends Component {
	render() {
		return (
			<div className="Person">
				{this.props.name}
			</div>
		);
	}
}

export default Person;