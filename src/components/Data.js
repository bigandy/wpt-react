import React, { Component } from 'react';

import Competitors from './Competitors';
import CompetitorSwitcher from './CompetitorSwitcher';

class Data extends Component {
	constructor(props) {
		super(props);

		this.average = this.props.data.average;

		this.inclusionList = [
			{
				'name': 'Load Time',
				'ref': 'loadTime',
			},
			{
				'name': 'First Byte',
				'ref': 'TTFB',
			},
			{
				'name': 'Start Render',
				'ref': 'render',
			},
			{
				'name': 'Visually Complete',
				'ref': 'lastVisualChange',
			},
			{
				'name': 'Requests',
				'ref': 'requestsFull',
			},
			{
				'name': 'Speed Index',
				'ref': 'SpeedIndex',
			},
		];

		this.inclusionListLength = this.inclusionList.length;

		this.state = {
			showCompetitors: {
				'author-services': false,
				'editor-resources': false,
				'group': false,
				'newsroom': false,
			},
		};
	};

	msToSeconds = (ms) => {
		return (ms / 1000) + 's';
	};

	showCompetitor = (event) => {
		const newState = {...this.state.showCompetitors};

		newState[event.target.id] = (newState[event.target.id]) ? false : true;
		this.setState({ showCompetitors: newState });
	};

	showTableData = (array) => {
		return this.inclusionList.map((key, i) => {
			let data;

			if (key.ref === 'SpeedIndex' || key.ref === 'requestsFull') {
				data = array[key.ref];
			} else {
				data = this.msToSeconds(array[key.ref]);
			}

		    return (
	    		<td key={ i }>{data}</td>
		    );
		});
	};

	render() {
		var thead = this.inclusionList.map((key, i) => {
			return (
				<th key={ i }>{key.name}</th>
			);
		});

		let average = this.props.data.average;
		let firstViewData = average.firstView;
		let repeatViewData = average.repeatView;

		let summaryUrl = this.props.data.summary;
		let siteText = (this.props.showCompetitors) ? 'Site' : 'Competitor';

		return (
			<table>
				<thead>
					<tr>
						<th>
							{siteText}: { this.props.site.name } { this.props.connectivity }<br />
							<a href={summaryUrl} target="_blank">Full Results on Web Page Test</a>
						</th>
						{ thead }
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>First View</td>
						{ this.showTableData(firstViewData) }
					</tr>
					<tr>
						<td>Repeat View</td>
						{ this.showTableData(repeatViewData) }
					</tr>
					{ this.props.showCompetitors &&
						<tr>
							<td colSpan={ this.inclusionListLength + 1 } className="competitors-wrapper">
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