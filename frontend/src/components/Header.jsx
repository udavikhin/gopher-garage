import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const Header = () => {
    const {isAuthenticated} = useAuth()

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <div className="site-header__left">
                    <Link className="brand" to="/">
                        <span className="brand__mark"><svg className="icon"><use href="/assets/icons/sprite.svg#i-car"/></svg></span>
                        <span className="brand__wordmark">Gopher Garage</span>
                    </Link>
                    <nav className="site-header__nav">
                        <Link to="/offers">Купить</Link>
                        <Link to="/offers/create">Продать</Link>
                        <Link to="/help">Помощь</Link>
                    </nav>
                </div>
                <div className="site-header__right">
                    {isAuthenticated ?
                        (<>
                            <Link className="btn btn--primary" to="/offers/create">
                                <svg className="icon">
                                    <use href="/assets/icons/sprite.svg#i-plus"/>
                                </svg>
                                Разместить объявление
                            </Link>
                            <div className="avatar avatar--md" aria-label="Иван Иванов">ИИ</div>
                        </>) : (<>
                            <span className="site-header__divider" aria-hidden="true"></span>
                            <Link className="btn btn--secondary site-header__login" to="/login">Войти</Link>
                            <Link className="btn btn--primary" to="/register">
                                <svg className="icon">
                                    <use href="/assets/icons/sprite.svg#i-plus"/>
                                </svg>
                                Создать аккаунт
                            </Link>
                        </>)}
                </div>
            </div>
        </header>
    )
}

export default Header;