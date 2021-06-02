import './Header.css';
import {NavLink} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({
                    pathname, isLoggedIn, handleMenuOpen, handleOnSavedMoviesClick, handleOnMoviesClick
                }) => {

    return (
        <header className={`header 
      ${(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && 'header_login'}
      ${pathname=== '/' && 'header_visible'}
      `}>
            <div className="header__container">
                <NavLink to="/" className="header__logo"/>
                {
                    !isLoggedIn && pathname === '/' ?
                        <nav className="header__options">
                            <NavLink to="/signup" className="header__option header__option_reg"
                            >Регистрация</NavLink>
                            <NavLink to="/signin" className="header__option header__option_login"
                                     >Войти</NavLink>
                        </nav> :
                        <div className="header__nav">
                            <Navigation handleOnSavedMoviesClick={handleOnSavedMoviesClick}
                                        handleOnMoviesClick={handleOnMoviesClick}/>
                        </div>
                }
                {isLoggedIn && <button className="header__menu-button" type="button" onClick={handleMenuOpen}/>}
            </div>
        </header>
    );
}

export default Header;
