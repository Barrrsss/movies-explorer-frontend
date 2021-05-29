import './Register.css';
import Auth from '../Auth/Auth';

const Register = ({onLogoClick, onRegister}) => {
    return (
        <section className="register">
            <Auth
                onLogoClick={onLogoClick}
                greeting="Добро пожаловать!"
                isNameVisible={true}
                buttonText="Зарегистрироваться"
                handleSubmit={onRegister}
                captionText="Уже зарегистрированы? "
                route="/signin"
                navLinkText="Войти"
            />
        </section>

    );
};

export default Register;
