export const MOVIE_URL = "https://api.nomoreparties.co";

class MoviesApi {
    constructor(options) {
        this.baseUrl = options.baseUrl;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getBeatFilmMovies() {
        return fetch(`${this.baseUrl}/beatfilm-movies`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => this._getResponseData(res));
    }
}

const moviesApi = new MoviesApi({
    baseUrl: MOVIE_URL
});

export default moviesApi;
