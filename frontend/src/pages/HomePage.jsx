const HomePage = () => {
    return (
        <>
            <section className="hero">
                <div className="hero__inner">
                    <h1 className="hero__title">Найдите свою следующую машину</h1>
                    <p className="hero__sub">152 348 проверенных объявлений от частных лиц и дилеров по всей России</p>

                    <form className="hero__search">
                        <div className="hero__fields">
                            <select className="select">
                                <option>Марка</option>
                                <option>BMW</option>
                                <option>Toyota</option>
                            </select>
                            <select className="select">
                                <option>Модель</option>
                                <option>3 серия</option>
                                <option>X5</option>
                            </select>
                            <input className="input" type="text" placeholder="Цена от" value="500 000"/>
                            <input className="input" type="text" placeholder="Цена до" value="5 000 000"/>
                            <input className="input" type="text" placeholder="Год от" value="2015"/>
                            <button className="btn btn--primary btn--lg" type="submit">
                                <svg className="icon">
                                    <use href="/assets/icons/sprite.svg#i-magnifier"/>
                                </svg>
                                Найти
                            </button>
                        </div>

                        <span className="hero__counter">
          <svg className="icon" style={{width:"14px", height: "14px", color: "var(--brand-primary)"}}><use
              href="/assets/icons/sprite.svg#i-check"/></svg>
          152 348 объявлений с актуальными ценами
        </span>
                    </form>
                </div>
            </section>
            <section className="section">
                <div className="section__inner">
                    <div className="section__head">
                        <h2 className="h-display-s">Свежие объявления</h2>
                        <a className="section__link" href="listings.html">Смотреть все <svg className="icon">
                            <use href="/assets/icons/sprite.svg#i-arrow-right"/>
                        </svg></a>
                    </div>

                    <div className="listings-grid">
                        <a className="listing-card" href="listing.html">
                            <img className="listing-card__media" src="assets/images/cars/toyota-camry.jpg"
                                 alt="Toyota Camry"/>
                            <div className="listing-card__body">
                                <span className="listing-card__price">2 450 000 ₽</span>
                                <span className="listing-card__title">Toyota Camry 2.5 AT, 2019</span>
                                <span className="listing-card__meta">68 400 км · Автомат · Бензин</span>
                                <span className="listing-card__location"><svg className="icon"><use
                                    href="/assets/icons/sprite.svg#i-map-pin"/></svg> Москва · 3 часа назад</span>
                            </div>
                        </a>
                        <a className="listing-card" href="listing.html">
                            <img className="listing-card__media" src="assets/images/cars/kia-sportage.jpg"
                                 alt="Kia Sportage"/>
                            <div className="listing-card__body">
                                <span className="listing-card__price">2 690 000 ₽</span>
                                <span className="listing-card__title">Kia Sportage 2.0 AT, 2020</span>
                                <span className="listing-card__meta">45 200 км · Автомат · Бензин</span>
                                <span className="listing-card__location"><svg className="icon"><use
                                    href="/assets/icons/sprite.svg#i-map-pin"/></svg> Санкт-Петербург · вчера</span>
                            </div>
                        </a>
                        <a className="listing-card" href="listing.html">
                            <img className="listing-card__media" src="assets/images/cars/lada-vesta.jpg"
                                 alt="Lada Vesta"/>
                            <div className="listing-card__body">
                                <span className="listing-card__price">1 480 000 ₽</span>
                                <span className="listing-card__title">Lada Vesta SW Cross, 2022</span>
                                <span className="listing-card__meta">21 800 км · Механика · Бензин</span>
                                <span className="listing-card__location"><svg className="icon"><use
                                    href="/assets/icons/sprite.svg#i-map-pin"/></svg> Казань · 2 дня назад</span>
                            </div>
                        </a>
                        <a className="listing-card" href="listing.html">
                            <img className="listing-card__media" src="assets/images/cars/mercedes-e.jpg"
                                 alt="Mercedes-Benz E 200"/>
                            <div className="listing-card__body">
                                <span className="listing-card__price">2 950 000 ₽</span>
                                <span className="listing-card__title">Mercedes-Benz E 200, 2018</span>
                                <span className="listing-card__meta">94 100 км · Автомат · Бензин</span>
                                <span className="listing-card__location"><svg className="icon"><use
                                    href="/assets/icons/sprite.svg#i-map-pin"/></svg> Екатеринбург · сегодня</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage