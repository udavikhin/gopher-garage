const HelpPage = () => {
    return (
        <main className="help">
            <section className="help__hero">
                <h1 className="help__title">Чем можем помочь?</h1>
                <p className="help__sub">Найдите ответ или напишите нам</p>
                <label className="help__search">
                    <svg className="icon" style={{width:"18px", height: "18px", color: "var(--font-tertiary)"}}>
                        <use href="/assets/icons/sprite.svg#i-magnifier"/>
                    </svg>
                    <input type="search" placeholder="Например, «как разместить объявление»"/>
                    <button className="btn btn--primary btn--sm">Найти</button>
                </label>
            </section>

            <section className="help__section">
                <h2>Популярные разделы</h2>
                <div className="help__topics">
                    <a className="help__topic" href="#">
                        <span className="icon-tile"><svg className="icon"><use href="/assets/icons/sprite.svg#i-magnifier"/></svg></span>
                        <h3>Для покупателей</h3>
                        <p>Как искать машину, сравнивать варианты и связываться с продавцом.</p>
                    </a>
                    <a className="help__topic" href="#">
                        <span className="icon-tile"><svg className="icon"><use href="/assets/icons/sprite.svg#i-plus"/></svg></span>
                        <h3>Для продавцов</h3>
                        <p>Как разместить объявление, добавить фото и поднять в выдаче.</p>
                    </a>
                    <a className="help__topic" href="#">
                        <span className="icon-tile"><svg className="icon"><use href="assets/icons/sprite.svg#i-eye"/></svg></span>
                        <h3>Регистрация и профиль</h3>
                        <p>Создание аккаунта, восстановление пароля, настройки уведомлений.</p>
                    </a>
                    <a className="help__topic" href="#">
                        <span className="icon-tile"><svg className="icon"><use href="assets/icons/sprite.svg#i-info"/></svg></span>
                        <h3>Оплата и документы</h3>
                        <p>Договор купли-продажи, оплата услуг, возврат денег.</p>
                    </a>
                    <a className="help__topic" href="#">
                        <span className="icon-tile"><svg className="icon"><use
                            href="assets/icons/sprite.svg#i-check-circle"/></svg></span>
                        <h3>Безопасность</h3>
                        <p>Как защитить себя от мошенничества при встрече.</p>
                    </a>
                    <a className="help__topic" href="#">
                        <span className="icon-tile"><svg className="icon"><use href="assets/icons/sprite.svg#i-chat"/></svg></span>
                        <h3>Техническая поддержка</h3>
                        <p>Проблемы со входом, загрузкой фото или работой чата.</p>
                    </a>
                </div>
            </section>

            <section className="help__section">
                <h2>Частые вопросы</h2>
                <div className="help__faq">
                    <details className="help__faq-item" open>
                        <summary>Как разместить объявление? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-down"/>
                        </svg></summary>
                        <p>Нажмите кнопку «Разместить объявление» в шапке сайта, заполните данные об автомобиле, добавьте
                            3–20 фотографий и опишите комплектацию. Объявление будет опубликовано после короткой модерации —
                            обычно в течение часа.</p>
                    </details>
                    <details className="help__faq-item">
                        <summary>Сколько стоит публикация? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-right"/>
                        </svg></summary>
                    </details>
                    <details className="help__faq-item">
                        <summary>Как связаться с продавцом? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-right"/>
                        </svg></summary>
                    </details>
                    <details className="help__faq-item">
                        <summary>Можно ли снять объявление с публикации? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-right"/>
                        </svg></summary>
                    </details>
                    <details className="help__faq-item">
                        <summary>Как изменить данные профиля? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-right"/>
                        </svg></summary>
                    </details>
                    <details className="help__faq-item">
                        <summary>Что делать, если не приходят уведомления? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-right"/>
                        </svg></summary>
                    </details>
                </div>
            </section>

            <section className="help__cta" id="contacts">
                <div>
                    <h3>Не нашли ответ?</h3>
                    <p>Напишите нам — отвечаем в течение часа в рабочее время.</p>
                </div>
                <div style={{display:"flex", gap:"8px"}}>
                    <a className="btn btn--primary" href="chat.html">Написать в поддержку</a>
                    <a className="btn btn--secondary" href="#">Телеграм-бот</a>
                </div>
            </section>
        </main>
    )
}

export default HelpPage;