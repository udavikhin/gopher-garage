const HelpPage = () => {
    return (
        <main className="help">
            <section className="help__hero">
                <h1 className="help__title">Чем можем помочь?</h1>
                <p className="help__sub">Найдите ответ или напишите нам</p>
            </section>

            <section className="help__section">
                <h2>Частые вопросы</h2>
                <div className="help__faq">
                    <details className="help__faq-item" open>
                        <summary>Как разместить объявление? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-down"/>
                        </svg></summary>
                        <p>Нажмите кнопку «Разместить объявление» в шапке сайта, заполните данные об автомобиле, добавьте
                            фотографии и опишите всё, что посчитаете нужным.</p>
                    </details>
                    <details className="help__faq-item">
                        <summary>Сколько стоит публикация? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-right"/>
                        </svg></summary>
                        <p>Размещение объявлений является бесплатным.</p>
                    </details>
                    <details className="help__faq-item">
                        <summary>Как связаться с продавцом? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-right"/>
                        </svg></summary>
                        <p>Номер телефона продавца указан на странице объявления.</p>
                    </details>
                    <details className="help__faq-item">
                        <summary>Можно ли снять объявление с публикации? <svg className="icon">
                            <use href="assets/icons/sprite.svg#i-caret-right"/>
                        </svg></summary>
                        <p>Да, можно. Для этого перейдите на страницу своего объявления и нажмите на кнопку "Снять с публикации".</p>
                    </details>
                </div>
            </section>

            <section className="help__cta" id="contacts">
                <div>
                    <h3>Не нашли ответ или возникли проблемы?</h3>
                    <p>Напишите нам — отвечаем оперативно</p>
                </div>
                <div style={{display:"flex", gap:"8px"}}>
                    <a className="btn btn--primary" href="mailto:anatoly.udavikhin@gmail.com">Написать на E-mail</a>
                    <a className="btn btn--secondary" href="https://t.me/carrerarouge">Telegram</a>
                </div>
            </section>
        </main>
    )
}

export default HelpPage;