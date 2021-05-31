import Auth from '../Auth/Auth';
import './Login.css';

const Login = ({ onLogin, isDisabled }) => {
    return (
        <section className="login">
            <Auth
                handleSubmit={onLogin}
                greeting="Рады видеть!"
                isNameVisible={false}
                buttonText="Войти"
                isDisabled={isDisabled}
                captionText="Еще не зарегистированы? "
                route="/signup"
                navLinkText="Регистрация"
            />
        </section>
    );
};

export default Login;
