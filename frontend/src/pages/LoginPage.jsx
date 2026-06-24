import {Link} from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";

const LoginPage = () => {
    return (
        <main className="auth auth--reverse">
            <aside className="auth__brand-side">
                <Link className="brand brand--inverse" to="/">
                    <span className="brand__mark"><svg className="icon"><use href="/assets/icons/sprite.svg#i-car"/></svg></span>
                    <span className="brand__wordmark">Gopher Garage</span>
                </Link>

                <header>
                    <h2 className="auth__brand-title">С возвращением</h2>
                    <p className="auth__brand-lead">Войдите, чтобы управлять своими объявлениями</p>
                </header>

                <div className="auth__illustration"
                     style={{backgroundImage: "url(/assets/images/auth-illustration.png)"}}></div>

                <figure className="auth__testimonial">
                    <blockquote>«Нашёл покупателя за два дня — по честной цене»</blockquote>
                    <figcaption>Иван К., Москва · продал LADA Vesta</figcaption>
                </figure>
            </aside>

            <section className="auth__form-side">
                <div className="auth__form-wrap">
                    <LoginForm />
                </div>
            </section>
        </main>
    )
}

export default LoginPage;