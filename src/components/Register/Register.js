import './Register.css';
import Auth from '../Auth/Auth';

const Register = ({isDisabled, onRegister}) => {
    return (
        <section className="register">
            <Auth
                isDisabled={isDisabled}
                greeting="Добро пожаловать!"
                isNameVisible={true}
                buttonText="Зарегистрироваться"
                handleSubmit={onRegister}
                captionText="Уже зарегистрированы? "
                route="/movies"
                navLinkText="Войти"
            />
        </section>

    );
};

export default Register;
