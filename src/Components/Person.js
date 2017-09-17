import React, { Component } from 'react';

class Person extends Component {
	render() {
		return (
			<div className="Person">
				{this.props.name}
				<img src={this.props.imgurl} />
			</div>
		);
	}
}

export default Person;