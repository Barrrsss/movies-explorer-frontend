import './Menu.css';
import Navigation from '../Navigation/Navigation';

const Menu = ({handleMenuClose, isOpen, handleOnSavedMoviesClick, handleOnMoviesClick, onClick}) => {
    return (
        <section className={`menu ${isOpen && 'menu_open'}`} onClick={onClick}>
            <div className="menu__container">
                <button className="menu__close" onClick={handleMenuClose}/>
                <Navigation handleOnSavedMoviesClick={handleOnSavedMoviesClick}
                            handleOnMoviesClick={handleOnMoviesClick}/>
            </div>
        </section>
    );
};

export default Menu;
