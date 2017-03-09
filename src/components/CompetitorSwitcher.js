import React, { Component } from 'react';

class CompetitorSwitcher extends Component {
	render() {
		return (
			<div onClick={ this.props.showCompetitor } id={ this.props.slug } className="competitor-switcher">
				Show Competitors: {(this.props.yesOrNo) ? 'No': 'Yes'}
			</div>
		);
	};
};

export default CompetitorSwitcher;