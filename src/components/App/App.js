import './App.css';
import React, {useState} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import {Route, Switch, useHistory, useLocation} from 'react-router';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Menu from '../Menu/Menu';
import Popup from '../Popup/Popup';

function App() {
    const history = useHistory();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isToMain, setIsToMain] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isFailedRegistration, setIsFailedRegistration] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
        history.push('/movies');
    }

    const handleRegister = () => {
        setIsFailedRegistration(false);
        openInfoPopup();
        history.push('/signin');
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        enterLanding();
        history.push('/');
    }

    const handleEditProfile = () => {
        openInfoPopup();
    }

    const enterLanding = () => {
        setIsToMain(true);
    }

    const leaveLanding = () => {
        setIsToMain(false);
    }

    const openMenu = () => {
        setIsMenuOpen(true);
    }

    const openInfoPopup = () => {
        setIsPopupOpen(true);
    }

    const closePopups = () => {
        setIsMenuOpen(false);
        setIsPopupOpen(false);
    }

    const handleLoginClick = () => {
        leaveLanding();
    };

    const handleRegisterClick = () => {
        leaveLanding();
    }

    const handleLogoClick = () => {
        enterLanding();
    }

    return (
        <div className="App">
            <Header pathname={location.pathname} isLoggedIn={isLoggedIn} isOnLanding={isToMain}
                    onLogoClick={handleLogoClick}
                    onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} handleMenuOpen={openMenu}
                    handleOnMainClick={enterLanding} handleOnMoviesClick={leaveLanding}
                    handleOnAccountClick={leaveLanding}/>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route exact path="/movies-explorer-frontend">
                    <Main/>
                </Route>
                <Route path="/movies">
                    <Movies/>
                </Route>
                <Route exact path="/saved-movies">
                    <SavedMovies/>
                </Route>
                <Route exact path="/profile">
                    <Profile userName="Виталий" handleLogout={handleLogout} handleSubmit={handleEditProfile}/>
                </Route>
                <Route exact path="/signin">
                    <Login onLogoClick={handleLogoClick} onLogin={handleLogin}/>
                </Route>
                <Route exact path="/signup">
                    <Register onLogoClick={handleLogoClick} onRegister={handleRegister}/>
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>

            <Footer pathname={location.pathname}/>

            <Menu handleMenuClose={closePopups} isOpen={isMenuOpen} handleOnMainClick={enterLanding}
                  handleOnMoviesClick={leaveLanding} handleOnAccountClick={leaveLanding}/>
            <Popup closePopup={closePopups} isOpen={isPopupOpen} isFailed={isFailedRegistration}/>
        </div>
    );
}

export default App;
