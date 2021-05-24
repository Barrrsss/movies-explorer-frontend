import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import {cards} from '../../utils/initialCards';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
    return (
        <section className="movies">
            <SearchForm/>
            <MoviesCardList cardList={cards} isOnSavedPage={false}/>
            <button className="movies__more" type="button">Ещё</button>
        </section>
    );
};

export default Movies;
