import './AboutMe.css';
import Data from '../Data/Data';
import photo from '../../images/photo.jpg';

const AboutMe = () => {
    return (
        <Data title="Студент" linkId="about" type="about">
            <div className="about">
                <h2 className="about__title">Алексей</h2>
                <p className="about__subtitle">Фронтенд-разработчик, 29 лет</p>
                <p className="about__text">На данный момент заканчиваю обучение по программе веб-разработчик в Я.Практикуме</p>
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
