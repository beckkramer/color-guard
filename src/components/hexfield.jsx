import React from 'react';

function Hexfield(props) {
	return (
    <label className="color-field">
    	<span className="field-title">{props.name}</span>
    	<input type="text" name={props.name} value={props.value} onChange={(e) => {props.onChange(e)}} />
    </label>
  );
}

export default Hexfield;