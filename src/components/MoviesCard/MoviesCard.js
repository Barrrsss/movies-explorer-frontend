import './MoviesCard.css';
import {useState} from 'react';
import {convertTime} from '../../utils/utils';

const MoviesCard = ({image, name, duration, isOnSavedPage}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleSaveClick = () => {
        setIsClicked(!isClicked);
    }

    const saveButtonClassName = (
        `movies-card__button movies-card__button_favorites ${isClicked && 'movies-card__button_favorites-on'}`
    );

    return (
        <li className="movies-card">

            <p className="movies-card__title">{name}</p>
            {
                isOnSavedPage ?
                    <button type="button" className="movies-card__button movies-card__button_delete"/> :
                    <button type="button" className={saveButtonClassName} onClick={handleSaveClick}/>
            }
            <p className="movies-card__duration">{convertTime(duration)}</p>
            <img className="movies-card__image" src={image} alt={name}/>
        </li>
    );
};

export default MoviesCard;
