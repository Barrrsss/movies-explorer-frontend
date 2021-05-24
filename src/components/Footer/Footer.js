import './Footer.css';

const Footer = ({pathname}) => {

  return(
    <footer className={`footer
    ${(pathname === '/signin' || pathname==='/signup') && 'footer_invisible'}`}>
      <div className="footer__container">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm</p>
        <div className="footer__info">
          <p className="footer__date">&copy; <span id="year">2021</span></p>
          <ul className="footer__links">
            <li className="footer__item">
              <a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://github.com/Barrrsss" target="_blank" rel="noreferrer">Github</a>
            </li>
            <li className="footer__item">
              <a className="footer__link" href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
