import React from 'react';

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
  		}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
  	let stateCopy = this.state;
		stateCopy.colors[event.target.name] = event.target.value;
		this.setState(stateCopy);
  }

	render() {
		return (
			<div className="palette">
				<Hexfield name="background" value={this.state.colors.background} onChange={this.handleChange} />
				<Hexfield name="foreground" value={this.state.colors.foreground} onChange={this.handleChange} />
			</div>
		);
	}
}

export default Palette;