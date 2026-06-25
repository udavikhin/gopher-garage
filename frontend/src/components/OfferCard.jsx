import {Link} from "react-router-dom";
import {useState} from "react";
import {BACKEND_URL} from "../api/client.js";
import {gearboxEnum} from "../data/const.js";
import {getColorGradient} from "../helpers.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

dayjs.extend(relativeTime);
dayjs.locale('ru');

const OfferCard = ({offer}) => {
    dayjs.extend(relativeTime);
    const [imgError, setImgError] = useState(false);

    return (
        <Link className="listing-card" to={`/offers/${offer.id}`}>
            {offer.photo_url && !imgError ? (
                <img
                    className="listing-card__media"
                    src={`${BACKEND_URL}${offer.photo_url}`}
                    alt=""
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className="listing-card__media listing-card__media--no-photo" style={getColorGradient(offer.color)}>
                    <span>Нет фото</span>
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