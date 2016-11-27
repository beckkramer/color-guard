import React from 'react';

function Swatch(props) {

	let aa = props.accessibility.aa ? "test-marker pass" : "test-marker fail";
	let aaLarge = props.accessibility.aaLarge ? "test-marker pass" : "test-marker fail";
	let aaa = props.accessibility.aaa ? "test-marker pass" : "test-marker fail";
	let aaaLarge = props.accessibility.aaaLarge ? "test-marker pass" : "test-marker fail";
	
	return (
    <div className="swatch" style={{background: props.color}}>
    	<ul>
    		<li className={aa}>AA</li>
    		<li className={aaLarge}>AA Large</li>
    		<li className={aaa}>AAA</li>
    		<li className={aaaLarge}>AAA Large</li>
    	</ul>
    </div>
  );
}

export default Swatch;