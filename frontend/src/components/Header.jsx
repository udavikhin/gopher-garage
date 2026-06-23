import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <div className="site-header__left">
                    <a className="brand" href="index.html">
                        <span className="brand__mark"><svg className="icon"><use href="assets/icons/sprite.svg#i-car"/></svg></span>
                        <span className="brand__wordmark">Gopher Garage</span>
                    </a>
                    <nav className="site-header__nav">
                        <Link to="/">Купить</Link>
                        <Link to="/offers/create">Продать</Link>
                        <a href="help.html">Помощь</a>
                    </nav>
                </div>
                <div className="site-header__right">
                    <button className="site-header__city">
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-map-pin"/>
                        </svg>
                        Москва
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-down"/>
                        </svg>
                    </button>
                    <a className="btn btn--primary" href="post.html">
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-plus"/>
                        </svg>
                        Разместить объявление
                    </a>
                    <div className="avatar avatar--md" aria-label="Иван Иванов">ИИ</div>
                </div>
            </div>
        </header>
    )
}

export default Header;