import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <Link className="brand brand--sm brand--inverse" to="/">
                    <span className="brand__mark"><svg className="icon"><use
                        href="/assets/icons/sprite.svg#i-car"/></svg></span>
                    <span className="brand__wordmark">Gopher Garage</span>
                </Link>
                <span
                    className="site-footer__copy">© {(new Date()).getFullYear()} · Выпускной проект на Go + React · Выполнен в рамках курса "Fullstack-разработчик на языке Golang"</span>
                <nav className="site-footer__links">
                    <Link to="/help">Помощь</Link>
                    <Link to="/help#contacts">Контакты</Link>
                    <a href="https://github.com/udavikhin" rel="noopener">GitHub</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;