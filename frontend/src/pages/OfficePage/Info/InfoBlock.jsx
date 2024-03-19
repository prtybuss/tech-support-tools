import React from "react";



function InfoBlock({ value, title }) {

	let rootClasses = ['InfoBlock']
	return (
		<div className={rootClasses.join('')} title={title}>

			{value}
		</div>
	);
}

export default InfoBlock;