import './App.css';
import React, {useState, useEffect} from 'react';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from '../../utils/auth';
import {checkIfIsShort} from '../../utils/utils';
import {
    amountToRender1024, amountToRender1280, amountToRender320,
    amountToRender768, defaultAmountToRender1024, defaultAmountToRender1280,
    defaultAmountToRender320, defaultAmountToRender768, failMessage,
    loginErrorMessage,
    movieSearchFailedMessage, registerSuccessMessage, updateSuccessMessage
} from '../../utils/constants';


function App() {
    const history = useHistory();
    const location = useLocation();

    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isFailedRegistration, setIsFailedRegistration] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');


    const [isFoundInMovies, setIsFoundInMovies] = useState(false);
    const [isFoundInSavedMovies, setIsFoundInSavedMovies] = useState(false);
    const [isRequestDone, setIsRequestDone] = useState(false);
    const [isRequestInSavedDone, setIsRequestInSavedDone] = useState(false);
    const [beatfilmMovies, setBeatfilmMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);
    const [isOnSavedPage, setIsOnSavedPage] = useState(false);
    const [amountToRender, setAmountToRender] = useState(0);
    const [defaultAmountToRender, setDefaultAmountToRender] = useState(0);

    const checkWidth = () => {
        let renderValue = 0;
        if (window.innerWidth >= 1280) {
            setDefaultAmountToRender(defaultAmountToRender1280);
            setAmountToRender(amountToRender1280);
            renderValue = amountToRender1280;
        }
        if (window.innerWidth >= 1024 && window.innerWidth < 1279) {
            setDefaultAmountToRender(defaultAmountToRender1024);
            setAmountToRender(amountToRender1024);
            renderValue = amountToRender1024;
        }
        if (window.innerWidth < 1024 && window.innerWidth > 480) {
            setDefaultAmountToRender(defaultAmountToRender768);
            setAmountToRender(amountToRender768);
            renderValue = amountToRender768;
        }
        if (window.innerWidth <= 480 && window.innerWidth >= 320) {
            setDefaultAmountToRender(defaultAmountToRender320);
            setAmountToRender(amountToRender320);
            renderValue = amountToRender320;
        }
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        setIsMoreBtnVisible(localMovies && (localMovies.length > renderValue));
        return {renderValue};
    }
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (isLoggedIn) {
            setIsLoading(true);
            Promise.all([
                mainApi.getMovies(jwt),
                mainApi.getUserInfo(jwt)
            ]).then((values) => {
                const [savedMovies, userInfo] = values;
                const userSavedMovies = savedMovies.filter((m) => {
                    return m.owner === currentUser._id
                })
                localStorage.setItem('savedMovies', JSON.stringify(userSavedMovies));
                setSavedMovies(userSavedMovies);
                setCurrentUser(userInfo);
                if (localStorage.getItem('beatFilmMovies')) {
                    setBeatfilmMovies(JSON.parse(localStorage.getItem('beatFilmMovies')));
                }

            })
                .catch((err) => console.log(err))
                .finally(() => {
                    setIsLoading(false);
                });
        }

    }, [isLoggedIn, currentUser._id]);

    useEffect(() => {
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, [])


    useEffect(() => {
        const handleTokenCheck = () => {
            if (localStorage.getItem('jwt')) {
                const jwt = localStorage.getItem('jwt');
                auth.checkToken(jwt)
                    .then((res) => {
                        if (res) {
                            setCurrentUser({email: res.email, name: res.name, _id: res._id});
                            setIsLoggedIn(true);
                            history.push('/');
                        } else {
                            setIsLoggedIn(false);
                            history.push('/');
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }
        handleTokenCheck();
    }, [history]);

    useEffect(() => {
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        if (isLoggedIn) {
            if (localMovies) {
                console.log(localMovies);
                setMovies(localMovies);

            }
        }
    }, [isLoggedIn])
    const updateMovies = (movies, isShortFilm) => {
        const amount = checkWidth();
        const moviesWithSavedOnes = movies.map((movie) => {
            const savedItem = savedMovies.find((m) => m.movieId === movie.id);
            return savedItem ? savedItem : movie;
        });
        localStorage.setItem('movies', JSON.stringify(moviesWithSavedOnes));
        if (isShortFilm) {
            const shortFilms = moviesWithSavedOnes.filter(checkIfIsShort);
            setMovies(shortFilms);
            setIsMoreBtnVisible(shortFilms.length > amount.renderValue);
        } else {
            setMovies(moviesWithSavedOnes);
        }
    };
    const filterMovies = (movies, query) => {
        const regex = new RegExp(query, 'gi');
        return movies.filter((movie) => {
                return regex.test(movie.nameRU);})
    }
    const searchPromise = (query) => {
        return new Promise((resolve, reject) => {
            if (beatfilmMovies.length === 0) {
                moviesApi.getBeatFilmMovies()
                    .then((movies) => movies.filter((movie) =>
                        movie.country &&
                        movie.director &&
                        movie.duration &&
                        movie.year &&
                        movie.description &&
                        movie.image &&
                        movie.trailerLink &&
                        movie.id &&
                        movie.nameRU &&
                        movie.nameEN
                    ).map(({
                               country,
                               director,
                               duration,
                               year,
                               description,
                               image,
                               trailerLink,
                               id,
                               nameRU,
                               nameEN
                           }) => ({
                        country,
                        director,
                        duration,
                        year,
                        description,
                        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
                        image: `https://api.nomoreparties.co${image.url}`,
                        trailer: trailerLink,
                        id,
                        nameRU,
                        nameEN
                    })))
                    .then((movies) => {
                        localStorage.setItem('beatFilmMovies', JSON.stringify(movies));
                        setBeatfilmMovies(movies);
                        resolve(filterMovies(movies, query));
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            } else {
                resolve(filterMovies(beatfilmMovies, query));
            }
        });
    }


    const searchInSavedPromise = (query) => {
        return new Promise((resolve, reject) => {
            if (savedMovies) {
                resolve(filterMovies(savedMovies, query))
            } else {
                reject(movieSearchFailedMessage);
            }
        });
    }


    const handleSearchInMovies = (query, isShortFilm) => {
        setIsLoading(true);
        searchPromise(query)
            .then((res) => {
                if (res && res.length > 0) {
                    setIsFoundInMovies(true);
                    localStorage.setItem('movies', JSON.stringify(res));
                    updateMovies(res, isShortFilm);
                } else {
                    localStorage.removeItem('movies');
                    setIsFoundInMovies(false);
                    setIsMoreBtnVisible(false);
                }
            })
            .catch((err) => {
                console.log(err);
                openInfoPopup(movieSearchFailedMessage);
            })
            .finally(() => {
                setIsRequestDone(true);
                setIsLoading(false);
            });
    }


    const handleSearchInSaved = (query, isShortFilm) => {
        setIsLoading(true);
        searchInSavedPromise(query, isShortFilm)
            .then((res) => {
                if (res && res.length > 0) {
                    setIsFoundInSavedMovies(true);
                    setSavedMovies(res);
                } else {
                    setIsFoundInSavedMovies(false);
                }
            })
            .catch((err) => {
                console.log(err);
                openInfoPopup(movieSearchFailedMessage);
            })
            .finally(() => {
                setIsRequestInSavedDone(true);
                setIsLoading(false);
            })
    }


    const handleSearch = (query, isShortFilm) => {
        isOnSavedPage ? handleSearchInSaved(query, isShortFilm) : handleSearchInMovies(query, isShortFilm);
    }


    const filterShortFilms = (isChecked) => {
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        if (localMovies && localMovies.length > 0) {
            setIsFoundInMovies(true);
            updateMovies(localMovies, isChecked);
        }
        setIsRequestDone(true);
    }

    const filterShortFilmsInSaved = (isChecked) => {
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        if (localSavedMovies && localSavedMovies.length > 0) {
            setIsFoundInSavedMovies(true);
            if (isChecked) {
                const shortFilms = savedMovies.filter(checkIfIsShort);
                setSavedMovies(shortFilms);
            } else {
                setSavedMovies(localSavedMovies);
            }
        }
        setIsRequestInSavedDone(true);
    }


    const saveMovie = (movie) => {
        const jwt = localStorage.getItem('jwt');
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const isSaved = localSavedMovies.some((m) => m.movieId === movie.id);
        if (!isSaved) {
            setIsLoading(true);
            mainApi.saveMovie(jwt, movie)
                .then((movie) => {
                    setMovies(movies.map((m) => m.id === movie.movieId ? movie : m));
                    const newSavedMovies = [movie, ...localSavedMovies];
                    localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
                    setSavedMovies(newSavedMovies);
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    const deleteMovie = (movieId) => {
        setIsLoading(true);
        const jwt = localStorage.getItem('jwt');
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        mainApi.deleteMovieFromSaved(jwt, movieId)
            .then((deletedMovie) => {
                const newMovies = localSavedMovies.filter((movie) => movie._id !== movieId);
                localStorage.setItem('savedMovies', JSON.stringify(newMovies));
                setSavedMovies(newMovies);
                setMovies(movies.map((movie) => movie._id === movieId ? beatfilmMovies.find((m) => m.id === movie.movieId) : movie));
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleOnSavedMoviesClick = () => {
        setIsOnSavedPage(true);
        const localSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        if (localSavedMovies && localSavedMovies.length > 0) {
            setIsFoundInSavedMovies(true);
            setIsRequestInSavedDone(true);
            setSavedMovies(localSavedMovies);
        }
    }

    const handleOnMoviesClick = () => {
        setIsOnSavedPage(false);
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        if (localMovies && localMovies.length > 0) {
            setIsFoundInMovies(true);
            setIsRequestDone(true);
            updateMovies(localMovies, false);
        }
    }

    const handleMoreBtnClick = () => {
        const newAmount = amountToRender + Math.min((movies.length - amountToRender), defaultAmountToRender);
        setAmountToRender(newAmount);
        if (movies.length - newAmount === 0) {
            setIsMoreBtnVisible(false);
        }
    }

    const openMenu = () => {
        setIsMenuOpen(true);
        setEscListener();
    }

    const openInfoPopup = (message) => {
        setEscListener();
        setPopupMessage(message);
        setIsPopupOpen(true);
    }

    const closeAllPopups = () => {
        setIsMenuOpen(false);
        setIsPopupOpen(false);
        removeEscListener();
    }

    const handleEscClose = (event) => {
        if (event.key === 'Escape') {
            closeAllPopups();
        }
    }

    const handleCLosePopupByClickOnOverlay = (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }
        closeAllPopups();
    }

    const setEscListener = () => {
        document.addEventListener('keydown', handleEscClose);
    }

    const removeEscListener = () => {
        document.removeEventListener('keydown', handleEscClose);
    }

    const handleLogin = ({email, password}) => {
        auth.authorize(email, password)
            .then((data) => {
                if (data && data.token) {
                    setCurrentUser({email: data.email, name: data.name, _id: data._id})
                    setIsLoggedIn(true);
                    history.push('/movies');
                } else {
                    openInfoPopup(loginErrorMessage);
                    setIsLoggedIn(false);
                }
            })
            .catch((err) => {
                console.log(err.message);
                openInfoPopup(failMessage);
            });
    }

    const handleRegister = ({email, password, name}) => {
        auth.register(email, password, name)
            .then((res) => {
                if (res) {
                    setIsFailedRegistration(false);
                    openInfoPopup(registerSuccessMessage);
                    handleLogin({email, password});
                } else {
                    setIsFailedRegistration(true);
                    openInfoPopup(failMessage);
                }
            })
            .catch((err) => {
                setIsFailedRegistration(true);
                openInfoPopup(failMessage);
                console.log(err.message);
            });
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentUser({});
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('beatFilmMovies');
        setMovies([]);
        setIsMoreBtnVisible(false);
        history.push('/');
    }

    const handleEditProfile = ({email, name}) => {
        setIsLoading(true);
        const jwt = localStorage.getItem('jwt');
        mainApi.updateUserInfo(jwt, email, name)
            .then((res) => {
                if (res) {
                    setCurrentUser({email: res.email, name: res.name, _id: res._id});
                    openInfoPopup(updateSuccessMessage);
                }
            })
            .catch((err) => {
                openInfoPopup(failMessage);
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
    const handleTumblerClick = (isChecked) => {
        if (isRequestDone || isRequestInSavedDone) {
            isOnSavedPage ? filterShortFilmsInSaved(isChecked) : filterShortFilms(isChecked);
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <Header pathname={location.pathname} isLoggedIn={isLoggedIn} handleMenuOpen={openMenu}
                        handleOnSavedMoviesClick={handleOnSavedMoviesClick} handleOnMoviesClick={handleOnMoviesClick}/>
                <div  className="page">

                    <Switch>
                        <Route exact path="/">
                            <Main/>
                        </Route>
                        <ProtectedRoute path="/profile" component={Profile} isLoggedIn={isLoggedIn}
                                        handleLogout={handleLogout}
                                        handleSubmit={handleEditProfile} isLoading={isLoading} isDisabled={isLoading}/>
                        <ProtectedRoute path="/movies" component={Movies} isLoggedIn={isLoggedIn} movies={movies}
                                        handleSearchSubmit={handleSearch} handleTumblerClick={handleTumblerClick}
                                        saveMovie={saveMovie}
                                        deleteMovie={deleteMovie} isFound={isFoundInMovies} isRequestDone={isRequestDone}
                                        amountToRender={amountToRender}
                                        handleMoreBtnClick={handleMoreBtnClick} isMoreBtnVisible={isMoreBtnVisible}
                                        isLoading={isLoading} isDisabled={isLoading}/>
                        <ProtectedRoute path="/saved-movies" component={SavedMovies} isLoggedIn={isLoggedIn}
                                        movies={savedMovies}
                                        handleSearchSubmit={handleSearchInSaved} handleTumblerClick={handleTumblerClick}
                                        saveMovie={saveMovie}
                                        deleteMovie={deleteMovie} isFound={isFoundInSavedMovies}
                                        isRequestDone={isRequestInSavedDone} isLoading={isLoading}
                                        isDisabled={isLoading}/>

                        <Route path="/signin">
                            <Login onLogin={handleLogin} isDisabled={isLoading}/>
                        </Route>
                        <Route path="/signup">
                            <Register onRegister={handleRegister} isDisabled={isLoading}/>
                        </Route>
                        <Route path="*">
                            <NotFound/>
                        </Route>
                    </Switch>



                    <Menu handleMenuClose={closeAllPopups} isOpen={isMenuOpen}
                          handleOnSavedMoviesClick={handleOnSavedMoviesClick}
                          handleOnMoviesClick={handleOnMoviesClick} onClick={handleCLosePopupByClickOnOverlay}/>
                    <Popup closePopup={closeAllPopups} isOpen={isPopupOpen} isFailed={isFailedRegistration}
                           message={popupMessage}
                           onClick={handleCLosePopupByClickOnOverlay}/>
                </div>
                <Footer pathname={location.pathname}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
