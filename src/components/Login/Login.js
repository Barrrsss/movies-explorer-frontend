import Auth from '../Auth/Auth';
import './Login.css';

const Login = ({onLogoClick, onLogin}) => {
    return (
        <section className="login">
            <Auth
                onLogoClick={onLogoClick}
                greeting="Рады видеть!"
                isNameVisible={false}
                buttonText="Войти"
                handleSubmit={onLogin}
                captionText="Еще не зарегистированы?"
                route="/signup"
                navLinkText="Регистрация"
            />
        </section>
    );
};

export default Login;
