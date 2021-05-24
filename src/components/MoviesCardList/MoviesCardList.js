import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

const MoviesCardList = ({cardList, isOnSavedPage}) => {
    return <ul className="moviescardlist">
        {
            cardList.map((card) => {
                return <MoviesCard key={card._id} image={card.image} name={card.name} duration={card.duration}
                                   isOnSavedPage={isOnSavedPage}/>
            })
        }
    </ul>
}

export default MoviesCardList;
