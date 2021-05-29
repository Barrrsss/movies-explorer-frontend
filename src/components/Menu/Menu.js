import './Menu.css';
import Navigation from '../Navigation/Navigation';

const Menu = ({ handleMenuClose, isOpen, handleOnMainClick, handleOnMoviesClick, handleOnAccountClick}) => {
  return (
    <section className={`menu ${isOpen && 'menu_open'}`}>
      <div className="menu__container">
        <button className="menu__close" onClick={handleMenuClose}/>
        <Navigation handleOnMainClick={handleOnMainClick} handleOnMoviesClick={handleOnMoviesClick}
        handleOnAccountClick={handleOnAccountClick}/>
      </div>
    </section>
  );
};

export default Menu;
