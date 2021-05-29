import './SearchForm.css';
import {useState} from 'react';
import {movieInput} from '../../utils/constants';

const SearchForm = () => {
    const [movie, setMovie] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleInputChange = (e) => {
        if (e.target.name === movieInput) {
            setMovie(e.target.value);
        } else {
            console.log(`Ошибка`);
        }
    }

    return (
        <div className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <div className="search__block-one">
                    <div className="search__icon"/>
                    <input className="search__input" placeholder="Фильм" required value={movie}
                           onChange={handleInputChange} name="movieInput"/>
                    <button type="submit" className="search__button"/>
                </div>
                <div className="search__block-two">
                    <div className="search__line"/>
                    <label className="search__tumbler">
                        <input type="checkbox" className="search__checkbox"/>
                        <span className="search__slider"/>
                    </label>
                    <p className="search__label-text">Короткометражки</p>
                </div>

            </form>

        </div>

    );
};

export default SearchForm;
