import './SavedMovies.css';
import {chosenCards} from '../../utils/initialCards';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = () => {
    return (
        <section className="saved-movies">
            <SearchForm/>
            <MoviesCardList cardList={chosenCards} isOnSavedPage={true}/>
        </section>
    );
};

export default SavedMovies;
