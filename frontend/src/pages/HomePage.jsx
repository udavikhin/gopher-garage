import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getOffers} from "../api/offers.js";
import OfferCard from "../components/OfferCard.jsx";
import SearchForm from "../components/SearchForm.jsx";

const HomePage = () => {
    const [offers, setOffers] = useState(null);

    useEffect(() => {
        getOffers()
            .then(response => {
                setOffers(response.data.offers ?? [])
            })
            .catch((e) => {
                console.log(e)
            })
    }, []);

    if (!offers) return <p>Загрузка...</p>;

    return (
        <>
            <section className="hero">
                <div className="hero__inner">
                    <h1 className="hero__title">Найдите свою новую машину</h1>
                    <p className="hero__sub">Объявления о продаже автомобилей со всей России</p>

                    <SearchForm />
                </div>
            </section>
            <section className="section">
                <div className="section__inner">
                    <div className="section__head">
                        <h2 className="h-display-s">Свежие объявления</h2>
                        <Link className="section__link" to="/offers">Смотреть все <svg className="icon">
                            <use href="/assets/icons/sprite.svg#i-arrow-right"/>
                        </svg></Link>
                    </div>

                    <div className="listings-grid">
                        {offers.map((offer) => (
                            <OfferCard key={offer.id} offer={offer} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage