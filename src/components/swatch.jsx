import React from 'react';

function Swatch(props) {

	let aa = props.accessibility.aa ? "pass" : "fail";
	let aaLarge = props.accessibility.aaLarge ? "pass" : "fail";
	let aaa = props.accessibility.aaa ? "pass" : "fail";
	let aaaLarge = props.accessibility.aaaLarge ? "pass" : "fail";
	
	return (
    <div className="swatch">
    	<div className="swatch__color" style={{background: props.color}}></div>
    	<ul className="test-markers">
    		<li className={aa}>AA</li>
    		<li className={aaLarge}>AA Large</li>
    		<li className={aaa}>AAA</li>
    		<li className={aaaLarge}>AAA Large</li>
    	</ul>
    </div>
  );
}

export default Swatch;