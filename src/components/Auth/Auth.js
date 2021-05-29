import './Auth.css';
import React, {useState, useRef, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {emailInput, passwordInput, nameInput} from '../../utils/constants';
import {validateAuth} from '../../utils/utils';

const Auth = ({
                  onLogoClick, greeting, isNameVisible, buttonText, handleSubmit,
                  captionText, route, navLinkText
              }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formRef = useRef();

    useEffect(() => {
        validateAuth(formRef.current).enableValidation();
    }, []);

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case nameInput:
                setName(e.target.value);
                break;
            case emailInput:
                setEmail(e.target.value);
                break;
            case passwordInput:
                setPassword(e.target.value);
                break;
            default:
                console.log(`Нет такого инпута: ${e.target.name}`);
                break;
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        handleSubmit();
    }

    return (
        <form className="auth" method="POST" onSubmit={onSubmit} ref={formRef}>
            <NavLink to="/" className="auth__logo" onClick={onLogoClick}/>
            <h3 className="auth__greeting">{greeting}</h3>

            <div className="auth__inputs">
                {isNameVisible &&
                <div className="auth__name-area">
                    <label className="auth__label">Имя</label>
                    <input className="auth__input" placeholder="Имя" name="nameInput" required id="name-input"
                           minLength="2" maxLength="30" value={name} onChange={handleInputChange}/>
                    <span className="auth__input-error" id="name-input-error"/>
                </div>
                }

                <label className="auth__label">E-mail</label>
                <input className="auth__input" placeholder="Email" type="email" name="emailInput" required
                       id="email-input" value={email} onChange={handleInputChange}
                       pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"/>
                <span className="auth__input-error" id="email-input-error"/>

                <label className="auth__label">Пароль</label>
                <input className="auth__input" placeholder="Пароль" type="password" minLength="8"
                       required name="passwordInput" id="password-input" value={password} onChange={handleInputChange}/>
                <span className="auth__input-error" id="password-input-error"/>
            </div>

            <button className="auth__submit-button" type="submit">{buttonText}</button>
            <p className="auth__caption">{captionText}
                <NavLink to={route} className="auth__link">{navLinkText}</NavLink>
            </p>
        </form>
    );
};

export default Auth;
