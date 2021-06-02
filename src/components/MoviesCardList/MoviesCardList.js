import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ movieList, isOnSavedPage, saveMovie, deleteMovie, isFound, isRequestDone,
                            amountToRender, isLoading }) => {


    return <>
        {isLoading && <Preloader />}
        <ul className={`movies-cardlist 
    ${!isRequestDone && 'movies-cardlist_hidden'}`}>
            {
                isFound ? movieList.slice(0, amountToRender).map((movie) => {
                    return <MoviesCard key={movie.nameRU} movie={movie} image={movie.image}
                                       nameRU={movie.nameRU} duration={movie.duration} isOnSavedPage={isOnSavedPage}
                                       saveMovie={saveMovie} deleteMovie={deleteMovie} />
                }) : <li className="movies-cardlist__not-found-text">Ничего не найдено</li>
            }
        </ul>
    </>
}

export default MoviesCardList;
