import { useState } from "react";

const useInput = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (event) => {
		setValue(event.target.value);
	};
	const reset = () => setValue('');
	return {
		value,
		setValue,
		onChange: handleChange
	};
};

export default useInput;
