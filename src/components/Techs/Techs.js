import './Techs.css';
import Data from '../Data/Data';

const Techs = () => {
    return (
        <Data title="Технологии" linkId="techs" type="techs" content="Информация о технологиях.">
            <div className="techs">
                <h2 className="techs__title">7 технологий</h2>
                <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили
                    в дипломном проекте.</p>
                <ul className="techs__items">
                    <p className="techs__item">HTML</p>
                    <p className="techs__item">CSS</p>
                    <p className="techs__item">JS</p>
                    <p className="techs__item">React</p>
                    <p className="techs__item">Git</p>
                    <p className="techs__item">Express.js</p>
                    <p className="techs__item">mongoDB</p>
                </ul>
            </div>
        </Data>
    );
};

export default Techs;
