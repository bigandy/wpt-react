import React, { Component } from 'react';

import Competitors from './Competitors';
import CompetitorSwitcher from './CompetitorSwitcher';

class Data extends Component {
	constructor(props) {
		super(props);

		this.average = this.props.data.average;

		this.inclusionList = [
			'loadTime',
			'TTFB',
			'requestsFull',
			'SpeedIndex'
		];

		this.keys = Object.keys(this.average.firstView).map((key) => {
			if (this.inclusionList.includes(key)) {
				return key;
			} else {
				return null;
			}
		});

		this.state = {
			showCompetitors: {
				'author-services': false,
				'editor-resources': false,
				'group': true,
				'newsroom': false,
			},
		};
	};

	showCompetitor = (event) => {
		const newState = {...this.state.showCompetitors};

		newState[event.target.id] = (newState[event.target.id]) ? false : true;
		this.setState({ showCompetitors: newState });
	};

	render() {
		var thead = this.keys.map((key, i) => {
			if (!key) {
				return null;
			}
			return (
				<th key={ i }>{key}</th>
			);
		});

		let average = this.props.data.average;
		let firstViewData = average.firstView;
		let repeatViewData = average.repeatView;

		var firstView = this.keys.map((key, i) => {
			if (!key) {
				return null;
			}
		    return (
	    		<td key={ i }>{firstViewData[key]}</td>
		    );
		});

		var repeatView = this.keys.map((key, i) => {
			if (!key) {
				return null;
			}
		    return (
	    		<td key={ i }>{repeatViewData[key]}</td>
		    );
		});

		let siteText = (this.props.showCompetitors) ? 'Site' : 'Competitor' ;

		return (
			<table>
				<thead>
					<tr>
						<th>{siteText}: { this.props.site.name } { this.props.connectivity }</th>
						{ thead }
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>First View</td>
						{ firstView }
					</tr>
					<tr>
						<td>Repeat View</td>
						{ repeatView }
					</tr>
					{ this.props.showCompetitors &&
						<tr>
							<td colSpan="5" className="competitors-wrapper">
								<CompetitorSwitcher
									showCompetitor={ this.showCompetitor }
									yesOrNo={ this.state.showCompetitors[this.props.site.slug] }
									slug={ this.props.site.slug }
								/>
								{
									this.state.showCompetitors[this.props.site.slug] &&
									<Competitors
										competitors={ this.props.competitors }
										connectivity={ this.props.connectivity }
										site={ this.props.site }
										thead={ thead }
									/>
								}

							</td>
						</tr>
					}
				</tbody>
			</table>
		);
	};
};

export default Data;