const OffersPage = () => {
    return (
        <section className="listings">
            <div className="listings__head">
                <div>
                    <h1 className="listings__title">Все объявления</h1>
                    <p className="listings__hint">152 348 объявлений в Москве и области</p>
                </div>
                <button className="input-group" style={{width: 'auto', cursor: 'pointer'}}>
                    <span>Сначала новые</span>
                    <svg className="icon">
                        <use href="assets/icons/sprite.svg#i-caret-down"/>
                    </svg>
                </button>
            </div>

            <div className="listings__body">
                <aside className="filter-card">
                    <div className="filter-card__head">
                        <h3>Фильтры</h3>
                        <a href="#">Сбросить</a>
                    </div>

                    <div className="filter-card__group">
                        <h4>Марка</h4>
                        <select className="select">
                            <option>Все марки</option>
                            <option>BMW</option>
                            <option>Toyota</option>
                        </select>
                    </div>

                    <div className="filter-card__group">
                        <h4>Цена, ₽</h4>
                        <div className="filter-card__range">
                            <input className="input" type="text" defaultValue="от 500 000"/>
                            <input className="input" type="text" defaultValue="до 5 000 000"/>
                        </div>
                    </div>

                    <div className="filter-card__group">
                        <h4>Год выпуска</h4>
                        <div className="filter-card__range">
                            <input className="input" type="text" defaultValue="от 2015"/>
                            <input className="input" type="text" defaultValue="до 2024"/>
                        </div>
                    </div>

                    <div className="filter-card__group">
                        <h4>Тип кузова</h4>
                        <div className="filter-card__options">
                            <label className="checkbox"><input type="checkbox" defaultChecked/><span className="box"></span>Седан</label>
                            <label className="checkbox"><input type="checkbox"/><span className="box"></span>Внедорожник</label>
                            <label className="checkbox"><input type="checkbox"/><span
                                className="box"></span>Хэтчбек</label>
                            <label className="checkbox"><input type="checkbox"/><span
                                className="box"></span>Универсал</label>
                            <label className="checkbox"><input type="checkbox"/><span
                                className="box"></span>Купе</label>
                        </div>
                    </div>

                    <div className="filter-card__group">
                        <h4>Коробка передач</h4>
                        <div className="filter-card__options">
                            <label className="radio"><input type="radio" name="gear" defaultChecked/><span
                                className="dot"></span>Автомат</label>
                            <label className="radio"><input type="radio" name="gear"/><span className="dot"></span>Механика</label>
                        </div>
                    </div>

                    <button className="btn btn--primary btn--block">Показать 847 объявлений</button>
                </aside>

                <div className="grid-3">
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/bmw-320i.jpg" alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">3 290 000 ₽</span><span className="listing-card__title">BMW 320i xDrive, 2021</span><span
                            className="listing-card__meta">42 800 км · Автомат</span><span
                            className="listing-card__location">Москва · сегодня</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/toyota-camry.jpg"
                                                                         alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">2 450 000 ₽</span><span className="listing-card__title">Toyota Camry 2.5 AT, 2019</span><span
                            className="listing-card__meta">68 400 км · Автомат</span><span
                            className="listing-card__location">Москва · вчера</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/hyundai-solaris.jpg"
                                                                         alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">1 180 000 ₽</span><span className="listing-card__title">Hyundai Solaris 1.6 MT, 2020</span><span
                            className="listing-card__meta">54 100 км · Механика</span><span
                            className="listing-card__location">Москва · 2 дня назад</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/audi-a4.jpg" alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">2 850 000 ₽</span><span className="listing-card__title">Audi A4 2.0 TFSI, 2020</span><span
                            className="listing-card__meta">61 200 км · Автомат</span><span
                            className="listing-card__location">Москва · 3 дня назад</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/lada-vesta.jpg"
                                                                         alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">1 380 000 ₽</span><span className="listing-card__title">Lada Vesta 1.6 MT, 2022</span><span
                            className="listing-card__meta">19 800 км · Механика</span><span
                            className="listing-card__location">Москва · 4 дня назад</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/vw-polo.jpg" alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">1 290 000 ₽</span><span className="listing-card__title">Volkswagen Polo 1.6 AT, 2019</span><span
                            className="listing-card__meta">71 500 км · Автомат</span><span
                            className="listing-card__location">Москва · 5 дней назад</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/kia-rio.jpg" alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">1 050 000 ₽</span><span className="listing-card__title">Kia Rio 1.4 AT, 2018</span><span
                            className="listing-card__meta">82 300 км · Автомат</span><span
                            className="listing-card__location">Москва · 6 дней назад</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/mercedes-e.jpg"
                                                                         alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">2 950 000 ₽</span><span className="listing-card__title">Mercedes-Benz E 200, 2018</span><span
                            className="listing-card__meta">94 100 км · Автомат</span><span
                            className="listing-card__location">Москва · неделю назад</span></div>
                    </a>
                    <a className="listing-card" href="listing.html"><img className="listing-card__media"
                                                                         src="assets/images/cars/ford-focus.jpg"
                                                                         alt=""/>
                        <div className="listing-card__body"><span
                            className="listing-card__price">1 120 000 ₽</span><span className="listing-card__title">Ford Focus 1.6 MT, 2017</span><span
                            className="listing-card__meta">103 700 км · Механика</span><span
                            className="listing-card__location">Москва · 8 дней назад</span></div>
                    </a>
                </div>
            </div>

            <div className="listings__pagination">
                <nav className="pagination">
                    <button className="pagination__btn">
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-left"/>
                        </svg>
                    </button>
                    <button className="pagination__btn pagination__btn--active">1</button>
                    <button className="pagination__btn">2</button>
                    <button className="pagination__btn">3</button>
                    <span className="pagination__ellipsis">…</span>
                    <button className="pagination__btn">71</button>
                    <button className="pagination__btn">
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-right"/>
                        </svg>
                    </button>
                </nav>
            </div>
        </section>
    )
}

export default OffersPage;