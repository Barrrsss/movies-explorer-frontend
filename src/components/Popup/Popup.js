import './Popup.css';

const Popup = ({closePopup, isOpen, message, onClick}) => {
    return (
        <section className={`popup ${isOpen && 'popup_opened'}`} onClick={onClick}>

            <div className="popup__container">
                <p className="popup__message">
                    { message }
                </p>
                <button className="popup__close" type="button" onClick={closePopup}/>

            </div>
        </section>
    );
}

export default Popup;
