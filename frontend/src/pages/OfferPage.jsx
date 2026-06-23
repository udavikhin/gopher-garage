const OfferPage = () => {
    return (
        <section className="listing">
            <nav className="breadcrumbs">
                <a href="index.html">Главная</a>
                <svg className="breadcrumbs__sep">
                    <use href="assets/icons/sprite.svg#i-caret-right"/>
                </svg>
                <a href="listings.html">Купить</a>
                <svg className="breadcrumbs__sep">
                    <use href="assets/icons/sprite.svg#i-caret-right"/>
                </svg>
                <a href="listings.html">BMW</a>
                <svg className="breadcrumbs__sep">
                    <use href="assets/icons/sprite.svg#i-caret-right"/>
                </svg>
                <a href="listings.html">3 серия</a>
                <svg className="breadcrumbs__sep">
                    <use href="assets/icons/sprite.svg#i-caret-right"/>
                </svg>
                <span className="breadcrumbs__item--current">BMW 320i 2021</span>
            </nav>

            <div className="listing__title-row">
                <div>
                    <h1 className="listing__title">BMW 320i xDrive M Sport</h1>
                    <div className="listing__meta">
                        <span>2021 год</span><span className="dot"></span>
                        <span>42 800 км</span><span className="dot"></span>
                        <span>Автомат</span><span className="dot"></span>
                        <span><svg className="icon" style={{width: '14px', height: '14px'}}><use
                            href="assets/icons/sprite.svg#i-map-pin"/></svg> Москва, Хамовники</span><span
                        className="dot"></span>
                        <span className="t-muted">№ 47218394</span>
                    </div>
                </div>
                <div className="listing__actions">
                    <button className="btn btn--secondary">
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-share"/>
                        </svg>
                        Поделиться
                    </button>
                    <button className="btn btn--secondary">
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-heart"/>
                        </svg>
                        В избранное
                    </button>
                </div>
            </div>

            <div className="listing__gallery-row">
                <div>
                    <div className="listing__photo"
                         style={{backgroundImage: 'url(assets/images/cars/bmw-320i-large.jpg)'}}></div>
                    <div className="listing__thumbs">
                        <div className="listing__thumb"
                             style={{backgroundImage: "url(assets/images/cars/bmw-320i-1.jpg)"}}></div>
                        <div className="listing__thumb is-active"
                             style={{backgroundImage: "url(assets/images/cars/bmw-320i-large.jpg)"}}></div>
                        <div className="listing__thumb"
                             style={{backgroundImage: "url(assets/images/cars/bmw-320i-3.jpg)"}}></div>
                        <div className="listing__thumb"
                             style={{backgroundImage: "url(assets/images/cars/bmw-320i-4.jpg)"}}></div>
                        <div className="listing__thumb"
                             style={{backgroundImage: "url(assets/images/cars/bmw-320i-5.jpg)"}}></div>
                        <div className="listing__thumb"
                             style={{backgroundImage: "url(assets/images/cars/bmw-320i-6.jpg)"}}></div>
                        <div className="listing__thumb"
                             style={{backgroundImage: "url(assets/images/cars/bmw-320i-7.jpg)"}}></div>
                    </div>
                </div>

                <aside className="listing__sidebar">
                    <span className="listing__price">3 290 000 ₽</span>
                    <div className="listing__seller">
                        <div className="avatar avatar--md avatar--amber">ИК</div>
                        <div className="listing__seller-info">
                            <span style={{fontWeight: '600'}}>Игорь Кравцов</span>
                            <span className="t-caption">Частное лицо · 4 года на сайте</span>
                        </div>
                    </div>
                    <button className="btn btn--primary btn--block btn--lg">
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-phone"/>
                        </svg>
                        +7 (925) 412-••-•• &nbsp;<span style={{opacity: '.8', fontWeight: '500'}}>Показать</span>
                    </button>
                    <a className="btn btn--secondary btn--block" href="chat.html">
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-chat"/>
                        </svg>
                        Написать сообщение
                    </a>
                </aside>
            </div>

            <article className="specs-card">
                <header className="specs-card__head">Характеристики</header>
                <div className="specs-card__grid">
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Год выпуска</div>
                        <div className="specs-card__item-value">2021</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Пробег</div>
                        <div className="specs-card__item-value">42 800 км</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Тип кузова</div>
                        <div className="specs-card__item-value">Седан</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Цвет</div>
                        <div className="specs-card__item-value">Синий металлик</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Двигатель</div>
                        <div className="specs-card__item-value">2.0 л / 184 л.с.</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Топливо</div>
                        <div className="specs-card__item-value">Бензин АИ-95</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Коробка передач</div>
                        <div className="specs-card__item-value">Автоматическая</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Привод</div>
                        <div className="specs-card__item-value">Полный (xDrive)</div>
                    </div>
                </div>
            </article>

            <article className="desc-card">
                <header className="desc-card__head">Описание от продавца</header>
                <p className="desc-card__text">Один владелец, обслуживание у официального дилера BMW Autodom. Машина в
                    идеальном состоянии: ни ДТП, ни сколов, салон без следов эксплуатации. Установлен полный пакет M
                    Sport: спортивная подвеска, рулевое управление с переменным усилием, обвес, диски M-стиль 19″.</p>
            </article>

            <article className="seller-card">
                <div className="avatar avatar--xl avatar--amber">ИК</div>
                <div className="seller-card__info">
                    <span className="seller-card__name">Игорь Кравцов</span>
                    <div className="seller-card__meta">
                        <span><svg className="icon" style={{width: '14px', height: '14px', color: '#f59e0b'}}><use
                            href="assets/icons/sprite.svg#i-star-fill"/></svg> 4.9 <span
                            className="t-muted">(23 отзыва)</span></span>
                        <span className="dot"
                              style={{width: '3px', height: '3px', background: 'var(--font-tertiary)', borderRadius: '50%'}}></span>
                        <span>Частное лицо</span>
                        <span className="dot"
                              style={{width: '3px', height: '3px', background: 'var(--font-tertiary)', borderRadius: '50%'}}></span>
                        <span>7 объявлений</span>
                    </div>
                </div>
                <div className="seller-card__actions">
                    <button className="btn btn--secondary">Все объявления</button>
                    <button className="btn btn--secondary">Отзывы</button>
                </div>
            </article>

            <section className="similar">
                <div className="similar__head">
                    <div>
                        <h2 className="h-display-s">Похожие объявления</h2>
                        <p className="t-caption">BMW 3 серия с похожими параметрами</p>
                    </div>
                    <a className="section__link" href="listings.html">Смотреть все <svg className="icon">
                        <use href="assets/icons/sprite.svg#i-arrow-right"/>
                    </svg></a>
                </div>
                <div className="similar__grid">
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/bmw-320d.jpg" alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">3 450 000 ₽</span><span className="listing-card__title">BMW 320d xDrive, 2022</span><span
                            className="listing-card__meta">38 100 км · Автомат · Дизель</span><span
                            className="listing-card__location">Москва · 2 дня назад</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/bmw-318i.jpg" alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">2 980 000 ₽</span><span className="listing-card__title">BMW 318i M Sport, 2020</span><span
                            className="listing-card__meta">58 700 км · Автомат · Бензин</span><span
                            className="listing-card__location">Санкт-Петербург · 5 дней назад</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/bmw-330i.jpg" alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">3 120 000 ₽</span><span className="listing-card__title">BMW 330i xDrive, 2021</span><span
                            className="listing-card__meta">51 200 км · Автомат · Бензин</span><span
                            className="listing-card__location">Казань · вчера</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/bmw-320i-2.jpg"
                                                                         alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">3 590 000 ₽</span><span className="listing-card__title">BMW 320i M Sport Pro, 2022</span><span
                            className="listing-card__meta">22 400 км · Автомат · Бензин</span><span
                            className="listing-card__location">Екатеринбург · 3 часа назад</span></div>
                    </a>
                </div>
            </section>
        </section>
    )
}

export default OfferPage;