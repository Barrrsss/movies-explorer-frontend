import './Navigation.css';
import {useState} from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = ({handleOnMainClick, handleOnMoviesClick, handleOnAccountClick}) => {
    const [isMoviesClicked, setIsMoviesClicked] = useState(false);
    const [isSavedMoviesClicked, setIsSavedMoviesClicked] = useState(false);
    const [isMainClicked, setIsMainClicked] = useState(false);
    const [isAccountClicked, setIsAccountClicked] = useState(false);

    const handleMoviesClick = () => {
        handleOnMoviesClick();
        setIsMoviesClicked(true);
        setIsSavedMoviesClicked(false);
        setIsMainClicked(false);
        setIsAccountClicked(false);
    }

    const handleSavedMoviesClick = () => {
        handleOnMoviesClick();
        setIsSavedMoviesClicked(true);
        setIsMoviesClicked(false);
        setIsMainClicked(false);
        setIsAccountClicked(false);
    }

    const handleMainClicked = () => {
        handleOnMainClick();
        setIsMainClicked(true);
        setIsSavedMoviesClicked(false);
        setIsMoviesClicked(false);
        setIsAccountClicked(false);
    }
    const handleAccountClicked = () => {
        handleOnMainClick();
        setIsMainClicked(false);
        setIsSavedMoviesClicked(false);
        setIsMoviesClicked(false);
        setIsAccountClicked(true);
    }

    return (
        <nav className="nav">
            <div className="nav__options">
                <NavLink to="/" className={`nav__link nav__link_type_main ${isMainClicked && 'nav__link_active'}`}
                         onClick={handleMainClicked}>Главная</NavLink>
                <div className="nav__movies">
                    <NavLink to="/movies" className={`nav__link ${isMoviesClicked && 'nav__link_active'}`}
                             onClick={handleMoviesClick}>Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={`nav__link ${isSavedMoviesClicked && 'nav__link_active'}`}
                             onClick={handleSavedMoviesClick}>Сохранённые фильмы</NavLink>
                </div>
                <NavLink to="/profile" className={`nav__account ${isAccountClicked && 'nav__link_active'}`}
                         onClick={handleAccountClicked}>
                    Аккаунт
                    <div className="nav__account-back" onClick={handleOnAccountClick}>
                    </div>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;
