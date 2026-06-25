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
                    <h2 className="auth__brand-title">Добро пожаловать<br/>в гараж</h2>
                    <p className="auth__brand-lead">Сообщество водителей и продавцов, где найти и продать машину так же
                        просто, как написать другу.</p>
                </header>

                <div className="auth__illustration"
                     style={{backgroundImage: "url(assets/images/auth-illustration.png)"}}></div>

                <div className="auth__stats">
                    <div className="auth__stat">
                        <div className="num">152K</div>
                        <div className="lbl">объявлений</div>
                    </div>
                    <div className="auth__stat">
                        <div className="num">38K</div>
                        <div className="lbl">продано в этом месяце</div>
                    </div>
                    <div className="auth__stat">
                        <div className="num">4.8</div>
                        <div className="lbl">средняя оценка</div>
                    </div>
                </div>
            </aside>
        </main>
    )
}

export default RegisterPage;