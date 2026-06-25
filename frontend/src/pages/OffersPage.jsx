import {useEffect, useState} from "react";
import {getOffers} from "../api/offers.js";
import OfferCard from "../components/OfferCard.jsx";
import OfferFilterForm from "../components/OfferFilterForm.jsx";
import {useSearchParams} from "react-router-dom";

const OffersPage = () => {
    const [offers, setOffers] = useState(null);

    const [searchParams] = useSearchParams();

    const PER_PAGE = 6;
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState({
        make:      searchParams.get('make') ?? '',
        model:     searchParams.get('model') ?? '',
        price_min: Number(searchParams.get('price_min')) ?? null,
        price_max: Number(searchParams.get('price_max')) ?? null,
        year_min:  Number(searchParams.get('year_min')) ?? null,
    });
    const totalPages = Math.ceil(total / PER_PAGE);

    useEffect(() => {
        getOffers({...filter, page, per_page: PER_PAGE})
            .then(response => {
                setOffers(response.data.offers ?? []);
                setTotal(response.data.total);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [page, filter]);

    if (!offers) return <p>Загрузка...</p>;

    return (
        <section className="listings">
            <div className="listings__head">
                <div>
                    <h1 className="listings__title">Все объявления</h1>
                    <p className="listings__hint">{total} объявлений</p>
                </div>
                <button className="input-group" style={{width: 'auto', cursor: 'pointer'}}>
                    <span>Сначала новые</span>
                    <svg className="icon">
                        <use href="/assets/icons/sprite.svg#i-caret-down"/>
                    </svg>
                </button>
            </div>

            <div className="listings__body">
                <OfferFilterForm onSubmit={(f) => {setFilter(f); setPage(1);}} />
                <div className="grid-3">
                    {offers.map((offer) => (
                        <OfferCard key={offer.id} offer={offer} />
                    ))}
                </div>
            </div>

            <div className="listings__pagination">
                <nav className="pagination">
                    { page > 1 && <button className="pagination__btn" onClick={() => setPage(page - 1)}>
                        <svg className="icon" >
                            <use href="/assets/icons/sprite.svg#i-caret-left"/>
                        </svg>
                    </button>}

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`pagination__btn${page === i + 1 ? ' pagination__btn--active' : ''}`}
                            onClick={() => setPage(i + 1)}
                        >{i + 1}</button>
                    ))}
                    { page < totalPages && <button className="pagination__btn" onClick={() => setPage(page + 1)}>
                        <svg className="icon">
                            <use href="/assets/icons/sprite.svg#i-caret-right"/>
                        </svg>
                    </button>}
                </nav>
            </div>
        </section>
    )
}

export default OffersPage;