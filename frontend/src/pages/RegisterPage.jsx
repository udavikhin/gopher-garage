import {Link} from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";

const RegisterPage = () => {
    return (
        <main className="auth">
            <section className="auth__form-side">
                <Link to="/" className="brand">
                    <span className="brand__mark"><svg className="icon"><use
                        href="/assets/icons/sprite.svg#i-car"/></svg></span>
                    <span className="brand__wordmark">Gopher Garage</span>
                </Link>

                <div className="auth__form-wrap">
                    <RegisterForm />
                </div>
            </section>

            <aside className="auth__brand-side">
                <header>
                    <h2 className="auth__brand-title">Добро пожаловать</h2>
                    <p className="auth__brand-lead">Платформа для людей, желающих совершить выгодную и безопасную сделку с авто</p>
                </header>

                <div className="auth__illustration"
                     style={{backgroundImage: "url(assets/images/auth-illustration.png)"}}></div>

            </aside>
        </main>
    )
}

export default RegisterPage;