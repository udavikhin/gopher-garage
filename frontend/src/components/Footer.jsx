const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <a className="brand brand--sm brand--inverse" href="index.html">
                    <span className="brand__mark"><svg className="icon"><use
                        href="/assets/icons/sprite.svg#i-car"/></svg></span>
                    <span className="brand__wordmark">Gopher Garage</span>
                </a>
                <span
                    className="site-footer__copy">© 2026 · Выпускной проект на Go · Выполнен в рамках курса "Разработчик полного цикла (Fullstack) на языке Голанг (Golang)"</span>
                <nav className="site-footer__links">
                    <a href="help.html">Помощь</a>
                    <a href="help.html#contacts">Контакты</a>
                    <a href="https://github.com" rel="noopener">GitHub</a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;