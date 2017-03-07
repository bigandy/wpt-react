import React, { Component } from 'react';

import Data from './Data';
import ConnectivitySwitcher from './ConnectivitySwitcher';

import config from '../config';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			connectivity: '3g',
		};

		this.switchConnectivity = this.switchConnectivity.bind(this);
	};

	grabData(site, connectivity, file) {
		return require(`../data/results/${site}/${connectivity}/${file}`);
	};

	switchConnectivity() {
		this.setState({
			connectivity: this.state.connectivity === 'cable' ? '3g' : 'cable'
		});
	};

	render() {
		const tables = config.sites.map((site, i) => {
			return (
				<Data
					site={ site }
					data={ this.grabData( site.slug, this.state.connectivity, 'master.json' ) }
					key={ i }
					connectivity={ this.state.connectivity }
					showCompetitors={ true }
				/>
			);
		});

		return (
			<div className="app-wrapper">
				<ConnectivitySwitcher switchConnectivity={ this.switchConnectivity } connectivity={ this.state.connectivity } />
				{ tables }
			</div>

		);
	};
};

export default App;
