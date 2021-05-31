import './SearchForm.css';
import { useState } from 'react';
import { Validate } from '../../utils/utils';

const SearchForm = ({ handleSearchSubmit, handleTumblerClick, isDisabled }) => {
    const { values, handleChange, errors, isValid } = Validate({});
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            handleSearchSubmit(values.movie, isChecked);
        }
    }

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        handleTumblerClick(e.target.checked, values.movie);
    }

    return (
        <div className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__block-one">
                    <div className="search__icon"/>
                    <input className={`search__input ${errors && errors["movie"] && 'search__input_type_error'}`}
                    placeholder="Фильм" required onChange={handleChange} name="movie" type="text" disabled={isDisabled}/>
                    <button type="submit" className="search__button" disabled={!isValid}/>
                </div>
                <div className="search__block-two">
                    <div className="search__line"/>
                    <label className="search__tumbler">
                        <input type="checkbox" name="shortFilmCheckbox" className="search__checkbox"
                               checked={isChecked} onChange={handleCheckboxChange} disabled={isDisabled}/>
                        <span className="search__slider"/>
                    </label>
                    <p className="search__label-text">Короткометражки</p>
                </div>

            </form>

        </div>

    );
};

export default SearchForm;
