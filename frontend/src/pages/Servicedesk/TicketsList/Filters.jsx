import React from "react";
import Button from "../../../components/UI/button/Button";

const Filters = ({ options, className, classNameForCurrent, onClick, currentFilter }) => {


	return (
		<>
			{options.map(option =>
				<Button
					className={(option.value === currentFilter) ? classNameForCurrent : className}
					key={option.value}
					value={option.value}
					onClick={e => onClick(e.target.value)}
				> {option.name} </Button>)}
		</>
	)
}

export default Filters;