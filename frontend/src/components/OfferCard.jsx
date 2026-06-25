import {Link} from "react-router-dom";
import {BACKEND_URL} from "../api/client.js";
import {gearboxEnum} from "../data/const.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

dayjs.extend(relativeTime);
dayjs.locale('ru');

const OfferCard = ({offer}) => {
    dayjs.extend(relativeTime);

    return (
        <Link className="listing-card" to={`/offers/${offer.id}`}>
            {offer.photo_url ? (
                <img className="listing-card__media" src={`${BACKEND_URL}${offer.photo_url}`} alt=""/>
            ) : (
                <div className="photo-stub photo-stub--gallery">
                    <svg className="icon">…</svg>
                    <span className="photo-stub__title">Фото пока не загружено</span>
                    <span className="photo-stub__hint">Продавец добавит снимки позже</span>
                </div>
            )}
            <div className="listing-card__body"><span
                className="listing-card__price">{offer.price.toLocaleString()} ₽</span><span
                className="listing-card__title">{offer.make + ' ' + offer.model + ', ' + offer.year}</span><span
                className="listing-card__meta">{offer.mileage.toLocaleString()} км · {gearboxEnum[offer.gearbox.vehicle_gearbox]}</span><span
                className="listing-card__time">{dayjs(offer.created_at).fromNow()}</span></div>
        </Link>
    )
}

export default OfferCard;