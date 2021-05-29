import './Header.css';
import {NavLink} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

const Header = ({
                    pathname, isLoggedIn, onLogoClick, onLoginClick, onRegisterClick,
                    handleMenuOpen, handleOnMainClick, handleOnMoviesClick, handleOnAccountClick
                }) => {

    return (
        <header className={`header 
      ${(pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && 'header_login'}
      ${(pathname === '/signin' || pathname === '/signup') && 'header_invisible'}
      `}>
            <div className="header__container">
                <NavLink to="/" className="header__logo" onClick={onLogoClick}/>
                {
                    !isLoggedIn && pathname === '/' ?
                        <nav className="header__options">
                            <NavLink to="/signup" className="header__option header__option_reg"
                                     onClick={onRegisterClick}>Регистрация</NavLink>
                            <NavLink to="/signin" className="header__option header__option_login"
                                     onClick={onLoginClick}>Войти</NavLink>
                        </nav> :
                        <div className="header__nav">
                            <Navigation handleOnMainClick={handleOnMainClick} handleOnMoviesClick={handleOnMoviesClick}
                                        handleOnAccountClick={handleOnAccountClick}/>
                        </div>
                }
                {isLoggedIn && <button className="header__menu-button" type="button" onClick={handleMenuOpen}/>}
            </div>
        </header>
    );
}

export default Header;
