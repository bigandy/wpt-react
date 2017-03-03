import React, { Component } from 'react';

import Data from './Data';

class Competitors extends Component {
	grabData(site, connectivity, file) {
		return require(`../data/results/${site}/${connectivity}/${file}`);
	};

	render() {
		const competitors = this.props.site.competitors.map((competitor, i) => {
			return (
				<Data
					site={ competitor }
					data={ this.grabData( this.props.site.slug, this.props.connectivity, `${competitor.slug}.json` ) }
					key={ i }
					connectivity={ this.props.connectivity }
					showCompetitors={ false }
				/>
			);
		});

		return (
			<div className="competitor-wrapper">{ competitors }</div>
		);
	};
};

export default Competitors;