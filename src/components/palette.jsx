import React from 'react';
import colorable from 'colorable';

// TODO: Pull this into its own file.
function Hexfield(props) {
	return (
    <label className="color-field">
    	<span className="field-title">{props.name}</span>
    	<input type="text" name={props.name} value={props.value} onChange={(e) => {props.onChange(e)}} />
    	<span className="swatch" style={{background: props.value}}></span>
    </label>
  );
}

class Palette extends React.Component {

	constructor() {
    super();
    this.state = {
  		colors: {
  			background: '#FFF',
  			foreground: "#C2C2C2",
  		},
  		contrast: '',
  		accessibility: {
				aa: false,
				aaLarge: false,
				aaa: false,
				aaaLarge: false,
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
			accessibilityResults = this.testColors();
			stateCopy.contrast = accessibilityResults.contrast;
			stateCopy.accessibility = accessibilityResults.accessibility;
		}

		this.setState(stateCopy);
  }

  testColors() {
		
		let result = colorable(this.state.colors, { compact: true, threshold: 0 });
		let contrast;
		let accessibility;
		
		if (result) {
			
			// Colorable checks every hex against every other hex, which is awesome
			// but more robust that we need just yet. Check the contrast of the
			// combination found on the first hext for now.
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
				<Hexfield name="background" value={this.state.colors.background} onChange={this.handleChange} />
				<Hexfield name="foreground" value={this.state.colors.foreground} onChange={this.handleChange} />
				<hr />
				<span>Contrast: {this.state.contrast}</span><br />
				<ul>
					<li>AA: {this.state.accessibility.aa ? 'Pass' : 'Fail'}</li>
					<li>AA (Large Text): {this.state.accessibility.aaLarge ? 'Pass' : 'Fail'}</li>
					<li>AAA: {this.state.accessibility.aaa ? 'Pass' : 'Fail'}</li>
					<li>AAA (Large Text): {this.state.accessibility.aaaLarge ? 'Pass' : 'Fail'}</li>
				</ul>
			</div>
		);
	}
}

export default Palette;