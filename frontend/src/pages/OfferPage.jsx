import {Link, Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOffer, setOfferArchived} from "../api/offers.js";
import {BACKEND_URL} from "../api/client.js";
import {fuelEnum, gearboxEnum} from "../data/const.js";
import colorsJSON from "../data/colors.json";
import {getInitials, getColorGradient} from "../helpers.js";
import {useAuth} from "../context/AuthContext.jsx";
import axios from "axios";

const OfferPage = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [offer, setOffer] = useState(null);
    const [selectedPhoto, setSelectedPhoto] = useState(0);
    const [failedPhotos, setFailedPhotos] = useState(new Set());

    const handlePhotoError = (photoId) => setFailedPhotos(prev => new Set([...prev, photoId]));

    const handleArchive = () => {
        const archived = !offer.archived_at;
        setOfferArchived(offer.id, archived);
        setOffer(prev => ({ ...prev, archived_at: archived ? new Date().toISOString() : null }));
    };

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        getOffer(id)
            .then(response => {
                setOffer(response.data)
            })
            .catch((e) => {
                console.log(e)
                if (e.response?.status === axios.HttpStatusCode.NotFound) setNotFound(true);
            })
    }, []);

    if (notFound) return <Navigate to="/404" />
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
                <Link to={`/offers?make=${offer.make}`}>{offer.make}</Link>
                <svg className="breadcrumbs__sep">
                    <use href="/assets/icons/sprite.svg#i-caret-right"/>
                </svg>
                <Link to={`/offers?make=${offer.make}&model=${offer.model}`}>{offer.model}</Link>
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
                {user?.user_id === offer.user_id && (
                    <button className="btn btn--secondary" onClick={handleArchive}>
                        {offer.archived_at ? 'Разархивировать' : 'Снять с публикации'}
                    </button>
                )}
            </div>

            <div className="listing__gallery-row">
                <div>
                    {offer.photos?.map(photo => (
                        <img key={photo.id} src={`${BACKEND_URL}${photo.url}`} style={{display: 'none'}} onError={() => handlePhotoError(photo.id)} alt=""/>
                    ))}
                    {(() => {
                        const photo = offer.photos?.[selectedPhoto];
                        const hasPhoto = photo && !failedPhotos.has(photo.id);
                        return (
                            <div
                                className={`listing__photo${!hasPhoto ? ' listing__photo--no-photo' : ''}`}
                                style={hasPhoto
                                    ? {backgroundImage: `url(${BACKEND_URL}${photo.url})`}
                                    : getColorGradient(offer.color)
                                }
                            >
                                {!hasPhoto && <span>Нет фото</span>}
                            </div>
                        );
                    })()}
                    <div className="listing__thumbs">
                        {offer.photos?.filter(photo => !failedPhotos.has(photo.id)).map((photo, i) => (
                            <div
                                key={photo.id}
                                className={`listing__thumb${i === selectedPhoto ? ' is-active' : ''}`}
                                style={{backgroundImage: `url(${BACKEND_URL}${photo.url})`}}
                                onClick={() => setSelectedPhoto(i)}
                            />
                        ))}
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
                        <div className="specs-card__item-value">{colorsJSON[offer.color].name}</div>
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