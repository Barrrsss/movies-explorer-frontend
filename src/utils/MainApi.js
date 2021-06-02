import { MOVIE_URL } from "./MoviesApi";
const none = 'none';

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getMovies(jwt) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res));
  }

  saveMovie(jwt, movie) {
    return fetch(`${this.baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        country: movie.country ? movie.country : none,
        director: movie.director ? movie.director : none,
        duration: movie.duration ? movie.duration : 0,
        year: movie.year ? movie.year : 0,
        description: movie.description ? movie.description : none,
        image: movie.image.url ? MOVIE_URL + movie.image.url : movie.image,
        trailer: movie.trailer ? movie.trailer : movie.trailerLink,
        nameRU: movie.nameRU ? movie.nameRU : none,
        nameEN: movie.nameEN ? movie.nameEN : none,
        thumbnail: movie.thumbnail ? movie.thumbnail : MOVIE_URL + movie.image.formats.thumbnail.url,
        movieId: movie.id
      })
    })
        .then((res) => this._getResponseData(res));
  }

  deleteMovieFromSaved(jwt, movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
        .then((res) => this._getResponseData(res));
  }

  toggleMovieSave(jwt, movie, movieId, isSaved) {
    return isSaved ? this.deleteMovieFromSaved(jwt, movieId) : this.saveMovie(jwt, movie);
  }

  getUserInfo(jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
        .then((res) => this._getResponseData(res));
  }

  updateUserInfo(jwt, email, name) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        email,
        name
      })
    })
        .then((res) => this._getResponseData(res));
  }
};
const mainApi = new MainApi({
  // baseUrl: "http://localhost:3000"
  baseUrl: "https://api.krasnov.diplom.nomoredomains.monster"
});

export default mainApi;
