import {useAuth} from "../context/AuthContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const RegisterForm = () => {
    const {register} = useAuth()
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        phone_number: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate("/");
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <form className="auth__form" onSubmit={handleSubmit}>
            <header>
                <h1 className="auth__title">Создайте аккаунт</h1>
                <p className="auth__sub">Это займёт меньше минуты — и вы сможете публиковать объявления.</p>
            </header>

            <label className="field"><span className="field__label">Имя</span>
                <input className="input" type="text" name="full_name" value={formData.full_name} onChange={handleChange} required/>
            </label>

            <label className="field"><span className="field__label">Email</span>
                <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required/>
            </label>

            <label className="field"><span className="field__label">Телефон</span>
                <div className="input-group">
                    <span className="prefix">+7</span>
                    <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} required/>
                </div>
            </label>

            <label className="field">
                <span className="field__label">Пароль <span className="field__hint">Минимум 8 символов</span></span>
                <div className="input-group">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required/>
                    <svg className="icon" style={{color: "var(--font-tertiary)", width: "18px", height: "18px"}}>
                        <use href="/assets/icons/sprite.svg#i-eye"/>
                    </svg>
                </div>
            </label>

            <label className="checkbox">
                <input type="checkbox" required/>
                <span className="box"></span>
                Я согласен с условиями использования и политикой конфиденциальности
            </label>

            { error && <p className="auth__error">{error}</p> }

            <button className="btn btn--primary btn--block btn--lg" type="submit">Создать аккаунт</button>

            <p className="auth__signin">Уже есть аккаунт? <Link to="/login">Войти</Link></p>
        </form>
    )
}

export default RegisterForm