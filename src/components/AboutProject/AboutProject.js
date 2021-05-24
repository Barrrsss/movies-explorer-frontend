import './AboutProject.css';
import Data from '../Data/Data';

const AboutProject = () => {
  return (
    <Data title="О проекте" linkId="about-project" type="project" content="Информация о проекте.">
      <ul className="project">
        <li className="project__phase">
          <p className="project__text project__text_title">Дипломный проект включал 5 этапов</p>
        </li>
        <li className="project__phase-sub">
          <p className="project__text project__text_description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="project__time">
          <p className="project__text project__text_title">На выполнение диплома ушло 5 недель</p>
        </li>
        <li className="project__time-sub">
          <p className="project__text project__text_description">У каждого этапа был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="project__scale">
        <div className="project__period">
          <p className="project__text  project__text_black">1 неделя</p>
        </div>
        <p className="project__text project__text_back">Back-end</p>
        <div className="project__period">
          <p className="project__text">4 недели</p>
        </div>
        <p className="project__text project__text_front">Front-end</p>
      </div>
    </Data>
  );
};

export default AboutProject;
