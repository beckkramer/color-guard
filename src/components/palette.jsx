import React from 'react';
import Hexfield from './hexfield.jsx';
import Swatch from './swatch.jsx';
import colorable from 'colorable';

class Palette extends React.Component {

	constructor() {
    super();
    this.state = {
  		colors: {
  			background: '#FFF',
  			foreground1: "#000",
  			foreground2: "#333",
  			foreground3: "#666",
  		},
  		accessibility: {
				foreground1: {
					'aa': true,
					'aaLarge': true,
					'aaa': true,
					'aaaLarge': true,
				},
  			foreground2: {
  				'aa': true,
					'aaLarge': true,
					'aaa': true,
					'aaaLarge': true,
  			},
  			foreground3: {
  				'aa': true,
					'aaLarge': true,
					'aaa': true,
					'aaaLarge': true,
  			},
			}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
  	let stateCopy = this.state;
  	let accessibilityResults;
		stateCopy.colors[event.target.name] = event.target.value;

		// Once input value is long enough, check the contrast.
		// When switch to color picker is made, this won't be
		// necessary.
		if (event.target.value.length === 4 || event.target.value.length === 7) {
			accessibilityResults = this.testColors(event.target.value);
			stateCopy.accessibility[event.target.name] = accessibilityResults.accessibility;
		}

		this.setState(stateCopy);
  }

  testColors(color) {

  	let colorSet = {
  		'background': this.state.colors.background,
  		'current': color
  	}
		
		let result = colorable(colorSet, { compact: true, threshold: 0 });
		let contrast;
		let accessibility;
		
		if (result) {
			
			// Colorable checks every hex against every other hex, which is awesome
			// but more robust that we need just yet. Check the contrast of the
			// combination found on the first hex for now.
			contrast = result[0].combinations[0].contrast;
			accessibility = result[0].combinations[0].accessibility;

		}

		return {
			'contrast': contrast,
			'accessibility': accessibility,
		}
  }

	render() {
		return (
			<div className="palette">
				
				<section>
					<header>
						<h2>Step 1:</h2>
						<p>Pick a background.</p>
					</header>

					<label className="color-field">
			    	<span className="field-title">background</span>
			    	<input name="background" value={this.state.colors.background} onChange={this.handleChange} />
			    </label>
		    </section>

		    <section className="has-hex-fields">
		    	<header>
						<h2>Step 2:</h2>
						<p>Pick some foreground colors and see how their contrast measures up.</p>
					</header>
					<Hexfield name="foreground1" value={this.state.colors.foreground1} onChange={this.handleChange} />
					<Hexfield name="foreground2" value={this.state.colors.foreground2} onChange={this.handleChange} />
					<Hexfield name="foreground3" value={this.state.colors.foreground3} onChange={this.handleChange} />
				</section>
				
				<div className="has-swatches" style={{background: this.state.colors.background}}>
					<Swatch color={this.state.colors.foreground1} accessibility={this.state.accessibility.foreground1} />
					<Swatch color={this.state.colors.foreground2} accessibility={this.state.accessibility.foreground2} />
					<Swatch color={this.state.colors.foreground3} accessibility={this.state.accessibility.foreground3} />
				</div>
				
			</div>
		);
	}
}

export default Palette;