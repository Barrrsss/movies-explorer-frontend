import React, {useState, useRef, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {emailInput, nameInput} from '../../utils/constants';
import {validateProfile} from '../../utils/utils';
import './Profile.css';

const Profile = ({userName, handleLogout, handleSubmit}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const formRef = useRef();

    useEffect(() => {
        validateProfile(formRef.current).enableValidation();
    }, []);

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case nameInput:
                setName(e.target.value);
                break;
            case emailInput:
                setEmail(e.target.value);
                break;
            default:
                console.log(`Нет такого инпута: ${e.target.name}`);
                break;
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (!email || !name) {
            return;
        }
        handleSubmit();
    }
    return (
        <section className="profile">
            <form className="profile__form" method="POST" onSubmit={onSubmit} ref={formRef}>
                <h3 className="profile__greeting">Привет, {userName}!</h3>
                <div className="profile__inputs">
                    <p className="profile__text profile__text_type_name">Имя</p>
                    <div className="profile__area profile__area_type_name">
                        <input className="profile__input profile__input_type_name" placeholder="Имя" id="name-input"
                               name="nameInput" value={name} onChange={handleInputChange} minLength="2" maxLength="30"
                               required/>
                        <span className="profile__input-error" id="name-input-error"/>
                    </div>
                    <div className="profile__area profile__area_type_email">
                        <input className="profile__input profile__input_type_email" type="email" placeholder="Почта"
                               id="email-input" value={email} name="emailInput" onChange={handleInputChange} required
                               pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"/>
                        <span className="profile__input-error" id="email-input-error"/>
                    </div>
                    <p className="profile__text profile__text_type_email">E-mail</p>
                </div>
                <button type="submit" className="profile__button">Редактировать</button>
                <NavLink to="/" className="profile__link" onClick={handleLogout}>Выйти из аккаунта</NavLink>
            </form>
        </section>
    );
};

export default Profile;
