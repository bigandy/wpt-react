import React, { Component } from 'react';

class ConnectivitySwitcher extends Component {
	render() {
		return (
			<div onClick={ this.props.switchConnectivity }>{this.props.connectivity}</div>
		);
	};
};

export default ConnectivitySwitcher;