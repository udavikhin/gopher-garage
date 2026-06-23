const CreateOfferPage = () => {
    return (
        <main className="container">
            <form className="post-form">
                <header className="post-form__head">
                    <h1 className="post-form__title">Новое объявление</h1>
                    <p className="post-form__sub">Заполните основную информацию о вашем автомобиле.</p>
                </header>

                <nav className="post-form__steps">
                    <span className="step step--active">1. Автомобиль</span>
                    <span className="step">2. Фото и описание</span>
                    <span className="step">3. Контакты</span>
                </nav>

                <section className="card">
                    <h2 className="h-display-s">Основные данные</h2>
                    <div className="post-form__grid">
                        <label className="field"><span className="field__label">Марка</span>
                            <select className="select">
                                <option>BMW</option>
                                <option>Toyota</option>
                            </select>
                        </label>
                        <label className="field"><span className="field__label">Модель</span>
                            <select className="select">
                                <option>3 серия</option>
                            </select>
                        </label>
                        <label className="field"><span className="field__label">Год выпуска</span><input
                            className="input" type="number" defaultValue="2021"/></label>
                        <label className="field"><span className="field__label">Пробег, км</span><input
                            className="input" type="number" defaultValue="42800"/></label>
                        <label className="field"><span className="field__label">Тип кузова</span>
                            <select className="select">
                                <option>Седан</option>
                                <option>Внедорожник</option>
                            </select>
                        </label>
                        <label className="field"><span className="field__label">Цвет</span>
                            <select className="select">
                                <option>Синий</option>
                            </select>
                        </label>
                        <div className="field"><span className="field__label">Коробка передач</span>
                            <div style={{display: "flex", gap: "24px", paddingTop: "6px"}}>
                                <label className="radio"><input type="radio" name="gear" defaultChecked /><span
                                    className="dot"></span>Автомат</label>
                                <label className="radio"><input type="radio" name="gear"/><span className="dot"></span>Механика</label>
                            </div>
                        </div>
                        <label className="field"><span className="field__label">Топливо</span>
                            <select className="select">
                                <option>Бензин</option>
                                <option>Дизель</option>
                            </select>
                        </label>
                    </div>
                </section>

                <section className="card">
                    <h2 className="h-display-s">Фотографии</h2>
                    <div className="post-form__upload">
                        <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-cloud-upload"/>
                        </svg>
                        <span className="lead">Перетащите фото или нажмите для выбора</span>
                        <span className="sub">До 20 фото, формат JPG/PNG, до 10 МБ каждая</span>
                    </div>
                    <div className="post-form__thumbs">
                        <div className="post-form__thumb"><span className="x">×</span></div>
                        <div className="post-form__thumb"><span className="x">×</span></div>
                        <div className="post-form__thumb"><span className="x">×</span></div>
                        <div className="post-form__thumb"><span className="x">×</span></div>
                        <div className="post-form__thumb post-form__thumb--add">+</div>
                    </div>
                </section>

                <section className="card">
                    <h2 className="h-display-s">Описание и цена</h2>
                    <label className="field"><span className="field__label">Описание</span>
                        <textarea className="textarea"
                                  placeholder="Расскажите коротко о машине: история обслуживания, особенности комплектации, что важно знать покупателю."></textarea>
                    </label>
                    <div className="post-form__grid">
                        <label className="field"><span className="field__label">Цена, ₽</span><input className="input"
                                                                                                     type="text"
                                                                                                     defaultValue="3 290 000"/></label>
                        <div className="field" style={{justifyContent: "flex-end"}}>
                            <label className="checkbox"><input type="checkbox"/><span className="box"></span>Готов к
                                торгу</label>
                        </div>
                    </div>
                </section>

                <footer className="post-form__actions">
                    <button className="btn btn--ghost">Сохранить в черновик</button>
                    <div className="right">
                        <button className="btn btn--secondary" disabled>Назад</button>
                        <button className="btn btn--primary">Дальше <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-arrow-right"/>
                        </svg></button>
                    </div>
                </footer>
            </form>
        </main>
    )
}

export default CreateOfferPage;