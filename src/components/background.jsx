import React from 'react';

function Background(props) {
	return (
    <label className="color-field color-field--background">
    	<span className="field-title">{props.name}</span>
    	<input type="text" name={props.name} value={props.value} onChange={(e) => {props.onChange(e)}} />
    </label>
  );
}

export default Background;