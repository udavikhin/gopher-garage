import {Link} from "react-router-dom";

const RegisterPage = () => {
    return (
        <main className="auth">
            <section className="auth__form-side">
                <Link to="/" className="brand">
                    <span className="brand__mark"><svg className="icon"><use
                        href="assets/icons/sprite.svg#i-car"/></svg></span>
                    <span className="brand__wordmark">Gopher Garage</span>
                </Link>

                <div className="auth__form-wrap">
                    <form className="auth__form">
                        <header>
                            <h1 className="auth__title">Создайте аккаунт</h1>
                            <p className="auth__sub">Это займёт меньше минуты — и вы сможете публиковать объявления.</p>
                        </header>

                        <label className="field"><span className="field__label">Имя</span>
                            <input className="input" type="text" defaultValue="Алексей Петров"/>
                        </label>

                        <label className="field"><span className="field__label">Email</span>
                            <input className="input is-focused" type="email" defaultValue="a.petrov@mail.ru"/>
                        </label>

                        <label className="field"><span className="field__label">Телефон</span>
                            <div className="input-group">
                                <span className="prefix">+7</span>
                                <input type="tel" defaultValue="(925) 412-00-58"/>
                            </div>
                        </label>

                        <label className="field">
                            <span className="field__label">Пароль <span
                                className="field__hint">Минимум 8 символов</span></span>
                            <div className="input-group">
                                <input type="password" defaultValue="••••••••••"/>
                                <svg className="icon" style={{color: "var(--font-tertiary)", width: "18px", height: "18px"}}>
                                    <use href="assets/icons/sprite.svg#i-eye"/>
                                </svg>
                            </div>
                        </label>

                        <label className="checkbox">
                            <input type="checkbox" defaultChecked/>
                            <span className="box"></span>
                            Я согласен с условиями использования и политикой конфиденциальности
                        </label>

                        <button className="btn btn--primary btn--block btn--lg" type="submit">Создать аккаунт</button>

                        <p className="auth__signin">Уже есть аккаунт? <a href="#">Войти</a></p>
                    </form>
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