import './AboutMe.css';
import Data from '../Data/Data';
import photo from '../../images/photo.jpg';

const AboutMe = () => {
    return (
        <Data title="Студент" linkId="about" type="about">
            <div className="about">
                <h2 className="about__title">Виталий</h2>
                <p className="about__subtitle">Фронтенд-разработчик, 30 лет</p>
                <p className="about__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
                    есть жена
                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
                    компании «СКБ Контур».
                    После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной
                    работы. </p>
                <ul className="about__links">
                    <li>
                        <a className="about__link" href="https://www.facebook.com"
                           target="_blank" rel="noreferrer">Facebook</a>
                    </li>
                    <li>
                        <a className="about__link" href="https://github.com/Barrrsss"
                           target="_blank" rel="noreferrer">Github</a>
                    </li>
                </ul>
                <img className="about__photo" src={photo} alt="Фото студента."/>
            </div>
        </Data>
    );
};

export default AboutMe;
