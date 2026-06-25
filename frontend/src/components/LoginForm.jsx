import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useFormData} from "../hooks/useFormData.js";

const LoginForm = () => {
    const {login} = useAuth()
    const navigate = useNavigate();

    const { formData, handleChange } = useFormData({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate("/");
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <form className="auth__form" onSubmit={handleSubmit}>
            <header>
                <h1 className="auth__title">Войти в аккаунт</h1>
                <p className="auth__sub">Рады видеть вас снова</p>
            </header>

            <label className="field"><span className="field__label">Email</span>
                <input
                    name="email"
                    className="input"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ivanov@gmail.com"/>
            </label>

            <label className="field"><span className="field__label">Пароль</span>
                <div className="input-group">
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••••"/>
                    <svg className="icon" style={{color: "var(--font-tertiary)", width: "18px", height: "18px"}}>
                        <use href="assets/icons/sprite.svg#i-eye"/>
                    </svg>
                </div>
            </label>

            <button className="btn btn--primary btn--block btn--lg" type="submit">Войти</button>
            { error && <p className="auth__error">{error}</p>}

            <p className="auth__signin">Нет аккаунта? <Link to="/register">Создать</Link></p>
        </form>
    )
}

export default LoginForm;