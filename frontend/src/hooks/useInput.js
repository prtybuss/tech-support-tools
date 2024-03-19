import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  /* const reset = () => setValue(''); */
  return {
    value,
    /*  reset: reset, */
    onChange: handleChange
  };
};

export default useInput;
