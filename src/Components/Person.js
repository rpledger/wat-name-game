import React, { Component } from 'react';

class Person extends Component {
	render() {
		return (
			<div className="Person">
				<img className="img-responsive" alt={this.props.name} src={this.props.imgurl} />
			</div>
		);
	}
}

export default Person;