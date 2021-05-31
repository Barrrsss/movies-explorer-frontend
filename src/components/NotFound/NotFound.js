import './NotFound.css';
import { useHistory } from 'react-router-dom';


const NotFound = () => {
    const history = useHistory();
    const handleBack = () => {
        history.goBack();
    }
    return (
        <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <button onClick={handleBack} className="not-found__button">Назад</button>
        </section>
    );
}

export default NotFound;
