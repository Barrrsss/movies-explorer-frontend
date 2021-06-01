import React, { useCallback } from 'react';

const convertTime = (min) => {
  return `${Math.floor(min/60)}ч ${min % 60}м`
}

const checkIfIsShort = (movie) => {
    return movie.duration <= 40;
}
function Validate(initialValues) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
export { convertTime, Validate, checkIfIsShort };
