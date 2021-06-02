import './MoviesCard.css';
import {useContext} from 'react';
import {convertTime} from '../../utils/utils';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';

const MoviesCard = ({movie, image, nameRU, duration, isOnSavedPage, saveMovie, deleteMovie}) => {

    const currentUser = useContext(CurrentUserContext);
    const isSaved = movie.owner && movie.owner === currentUser._id;

    const handleSaveButtonClick = () => {
        if (isSaved) {
            deleteMovie(movie._id, movie);
        } else {
            saveMovie(movie);
        }
    }

    const handleDeleteButtonClick = () => {
        deleteMovie(movie._id, movie);
    }

    const handleOpenTrailer = () => {
        return window.open(movie.trailer);
    }


    return (
        <li className="movies-card">

            <p className="movies-card__title">{nameRU}</p>
            {
                isOnSavedPage ?
                    <button type="button" className="movies-card__button movies-card__button_delete"
                            onClick={handleDeleteButtonClick}/> :
                    <button type="button"
                            className={`movies-card__button movies-card__button_favorites ${isSaved && 'movies-card__button_favorites-on'}`}
                            onClick={handleSaveButtonClick}/>
            }
            <p className="movies-card__duration">{convertTime(duration)}</p>
                <div onClick={handleOpenTrailer}
                     className="movies-card__image" style={{ background: `center/cover url(${ image }) no-repeat` }}/>
        </li>
    );
};

export default MoviesCard;
