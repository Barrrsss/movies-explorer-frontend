import React, { useCallback } from 'react';

const convertTime = (min) => {
  return `${Math.floor(min/60)}ч ${min % 60}м`
}

const checkMovieTitle = (movie, query) => {
    return movie.nameRU.toLowerCase().replaceAll(/["«»]/g, '').split(' ').includes(query.toLowerCase()) ||
        (movie.nameEN && movie.nameEN.toLowerCase().replaceAll(/["«»]/g, '').split(' ').includes(query.toLowerCase()));
}

const checkIfIsShort = (movie) => {
    return movie.duration <= 40;
}

const searchMovies = (movies,query) => {
    const queryArr = query.toLowerCase().trim().split(' ');
    const result = movies.filter((movie) => {
        for(let i = 0; i < queryArr.length; i++) {
            if(!checkMovieTitle(movie, queryArr[i])) {
                return false;
            }
        }
        return true;
    });
    return result;
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
export { convertTime, Validate,  searchMovies, checkIfIsShort };
