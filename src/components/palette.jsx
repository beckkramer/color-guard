import React from 'react';
//import Background from './background.jsx';
import Foreground from './foreground.jsx';
import Swatch from './swatch.jsx';
import colorable from 'colorable';

class Palette extends React.Component {

	constructor() {
    super();
    this.state = {
  		colors: {
  			background: '#FFF',
  			foreground: [
  				{
  					'hex': '#000',
  					'accessibility': {
							'aa': true,
							'aaLarge': true,
							'aaa': true,
							'aaaLarge': true,
						}
					},{
  					'hex': '#333',
  					'accessibility': {
							'aa': true,
							'aaLarge': true,
							'aaa': true,
							'aaaLarge': true,
						}
					},{
  					'hex': '#666',
  					'accessibility': {
							'aa': true,
							'aaLarge': true,
							'aaa': false,
							'aaaLarge': true,
						}
					}

  			],
  		},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index) {

  	let stateCopy = this.state;
  	let accessibilityResults;
		stateCopy.colors.foreground[index]['hex'] = event.target.value;

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
//<Foreground name="foreground{index}" value={value} onChange={this.handleChange} />
//<Swatch color={this.state.colors.foreground1} accessibility={this.state.accessibility.foreground1} />
	render() {

		let foregroundComponents = this.state.colors.foreground.map(function(color, index){
      return <Foreground key={'foreground-' + index} name={'foreground #' + (index + 1)} value={color.hex} />;
    });
    let swatches = this.state.colors.foreground.map(function(color, index){
      return <Swatch  key={'swatch-' + index} color={color.hex} accessibility="" />;
    });

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
					{foregroundComponents}
				</section>
				
				<div className="has-swatches" style={{background: this.state.colors.background}}>
					{swatches}
				</div>
				
			</div>
		);
	}
}

export default Palette;