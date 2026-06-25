import {useEffect, useState} from "react";
import cars from "../data/cars.json";
import {getOffer, getOffers} from "../api/offers.js";
import OfferCard from "../components/OfferCard.jsx";

const OffersPage = () => {

    const [selectedMake, setSelectedMake] = useState('');

    const makes = Object.keys(cars.brands);
    const models = selectedMake ? cars.brands[selectedMake] : [];

    const [offers, setOffers] = useState(null);

    useEffect(() => {
        getOffers()
            .then(response => {
                setOffers(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, []);

    if (!offers) return <p>Загрузка...</p>;

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
                        <use href="/assets/icons/sprite.svg#i-caret-down"/>
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
                        <select
                            className="select"
                            defaultValue=""
                            onChange={(e) => setSelectedMake(e.target.value)}
                        >
                            <option value="" disabled>Все марки</option>
                            {makes.map((make) => (
                                <option key={make} value={make}>{make}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-card__group">
                        <h4>Модель</h4>
                        <select className="select" defaultValue="">
                            <option value="" disabled>Все модели</option>
                            {models.map((model) => (
                                <option key={model} value={model}>{model}</option>
                            ))}
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
                        <h4>Коробка передач</h4>
                        <div className="filter-card__options">
                            <label className="radio"><input type="radio" name="gear" defaultChecked/><span
                                className="dot"></span>Автомат</label>
                            <label className="radio"><input type="radio" name="gear"/><span className="dot"></span>Механика</label>
                        </div>
                    </div>

                    <button className="btn btn--primary btn--block">Показать</button>
                </aside>

                <div className="grid-3">
                    {offers.map((offer) => (
                        <OfferCard offer={offer} />
                    ))}
                </div>
            </div>

            <div className="listings__pagination">
                <nav className="pagination">
                    <button className="pagination__btn">
                        <svg className="icon">
                            <use href="/assets/icons/sprite.svg#i-caret-left"/>
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