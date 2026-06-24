import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <main className="auth auth--reverse">
            <aside className="auth__brand-side">
                <Link className="brand brand--inverse" to="/">
                    <span className="brand__mark"><svg className="icon"><use href="/assets/icons/i-car.svg#i-car"/></svg></span>
                    <span className="brand__wordmark">Gopher Garage</span>
                </Link>

                <header>
                    <h2 className="auth__brand-title">С возвращением<br/>в гараж</h2>
                    <p className="auth__brand-lead">Войдите, чтобы управлять объявлениями, вести диалоги с покупателями
                        и сохранять избранные машины.</p>
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
                    <form className="auth__form" onSubmit="return false;">
                        <header>
                            <h1 className="auth__title">Войти в аккаунт</h1>
                            <p className="auth__sub">Рады видеть вас снова — продолжим там, где остановились.</p>
                        </header>

                        <label className="field"><span className="field__label">Email</span>
                            <input className="input" type="email" defaultValue="a.petrov@mail.ru"/>
                        </label>

                        <label className="field"><span className="field__label">Пароль</span>
                            <div className="input-group">
                                <input type="password" defaultValue="••••••••••"/>
                                <svg className="icon" style={{color:"var(--font-tertiary)",width:"18px",height:"18px"}}>
                                    <use href="assets/icons/i-eye.svg#i-eye"/>
                                </svg>
                            </div>
                        </label>

                        <div className="auth__helpers">
                            <label className="checkbox">
                                <input type="checkbox" checked/>
                                <span className="box"></span>
                                Запомнить меня
                            </label>
                            <a className="auth__forgot" href="#">Забыли пароль?</a>
                        </div>

                        <button className="btn btn--primary btn--block btn--lg" type="submit">Войти</button>

                        <p className="auth__signin">Нет аккаунта? <Link to="/">Создать</Link></p>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default LoginPage;