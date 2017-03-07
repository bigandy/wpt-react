import React, { Component } from 'react';

// import config from '../config';


class App extends Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		connectivity: '3g',
	// 	};

	// 	this.switchConnectivity = this.switchConnectivity.bind(this);
	// };

	grabData() {
		return require(`../data/results/master.json`);
	};

	// switchConnectivity() {
	// 	this.setState({
	// 		connectivity: this.state.connectivity === 'cable' ? '3g' : 'cable'
	// 	});
	// };

	render() {
		const data = this.grabData();
		console.log(data);

		const results = data.map((date) => {
			console.log(date);
			return (
				<div>
					<h2>{date.date}</h2>
					{ date.data['3GResults'].map(site => {
						const fv = site.average.firstView;
						return (
							<div>
								<h3>{site.url}</h3>
								<ul>
									<li>Load Time {fv.loadTime}</li>
									<li>TTFB {fv.TTFB}</li>
								</ul>
							</div>
						);
					}) }
				</div>
			);
		});

		return (
			<div className="app-wrapper">
				Version 2
				{ results }
			</div>

		);
	};
};

export default App;
