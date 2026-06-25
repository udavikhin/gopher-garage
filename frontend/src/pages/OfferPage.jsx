import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOffer} from "../api/offers.js";
import {fuelEnum, gearboxEnum} from "../data/const.js";
import {getInitials} from "../helpers.js";

const OfferPage = () => {
    const {id} = useParams();
    const [offer, setOffer] = useState(null);

    useEffect(() => {
        getOffer(id)
            .then(response => {
                setOffer(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, []);

    if (!offer) return <p>Загрузка...</p>;

    return (
        <section className="listing">
            <nav className="breadcrumbs">
                <Link to="/">Главная</Link>
                <svg className="breadcrumbs__sep">
                    <use href="/assets/icons/sprite.svg#i-caret-right"/>
                </svg>
                <Link to="/offers">Купить</Link>
                <svg className="breadcrumbs__sep">
                    <use href="/assets/icons/sprite.svg#i-caret-right"/>
                </svg>
                <a href="listings.html">{offer.make}</a>
                <svg className="breadcrumbs__sep">
                    <use href="/assets/icons/sprite.svg#i-caret-right"/>
                </svg>
                <a href="listings.html">{offer.model}</a>
                <svg className="breadcrumbs__sep">
                    <use href="/assets/icons/sprite.svg#i-caret-right"/>
                </svg>
                <span className="breadcrumbs__item--current">{offer.make} {offer.model} {offer.year}</span>
            </nav>

            <div className="listing__title-row">
                <div>
                    <h1 className="listing__title">{offer.make} {offer.model}</h1>
                    <div className="listing__meta">
                        <span>{offer.year} год</span><span className="dot"></span>
                        <span>{offer.mileage.toLocaleString()} км</span><span className="dot"></span>
                        <span>{gearboxEnum[offer.gearbox.vehicle_gearbox]}</span><span className="dot"></span>
                        <span className="t-muted">№ {id}</span>
                    </div>
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
                    <span className="listing__price">{offer.price.toLocaleString()} ₽</span>
                    <div className="listing__seller">
                        <div className="avatar avatar--md avatar--amber">{getInitials(offer.user.full_name)}</div>
                        <div className="listing__seller-info">
                            <span style={{fontWeight: '600'}}>{offer.user.full_name}</span>
                            <span className="t-caption">Пользователь</span>
                        </div>
                    </div>
                    <a href={"tel:+7" + offer.user.phone_number} className="btn btn--primary btn--block btn--lg">
                        <svg className="icon">
                            <use href="/assets/icons/sprite.svg#i-phone"/>
                        </svg>
                        +7{offer.user.phone_number}
                    </a>
                </aside>
            </div>

            <article className="desc-card">
                <header className="desc-card__head">Описание от продавца</header>
                <p className="desc-card__text">{offer.description}</p>
            </article>

            <article className="specs-card">
                <header className="specs-card__head">Характеристики</header>
                <div className="specs-card__grid">
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Год выпуска</div>
                        <div className="specs-card__item-value">{offer.year}</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Пробег</div>
                        <div className="specs-card__item-value">{offer.mileage.toLocaleString()} км</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Владельцев по ПТС</div>
                        <div className="specs-card__item-value">{offer.owners}</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Цвет</div>
                        <div className="specs-card__item-value">{offer.color}</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Топливо</div>
                        <div className="specs-card__item-value">{fuelEnum[offer.fuel.vehicle_fuel]}</div>
                    </div>
                    <div className="specs-card__item">
                        <div className="specs-card__item-label">Коробка передач</div>
                        <div className="specs-card__item-value">{gearboxEnum[offer.gearbox.vehicle_gearbox]}</div>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default OfferPage;