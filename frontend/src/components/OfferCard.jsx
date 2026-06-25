import {Link} from "react-router-dom";
import {gearboxEnum} from "../data/const.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

dayjs.extend(relativeTime);
dayjs.locale('ru');

const OfferCard = ({offer}) => {
    dayjs.extend(relativeTime);

    return (
        <Link className="listing-card" to={`/offers/${offer.id}`}><img className="listing-card__media"
                                                             src="assets/images/cars/bmw-320i.jpg" alt=""/>
            <div className="listing-card__body"><span
                className="listing-card__price">{offer.price.toLocaleString()} ₽</span><span className="listing-card__title">{offer.make + ' ' + offer.model + ', ' + offer.year}</span><span
                className="listing-card__meta">{offer.mileage.toLocaleString()} км · {gearboxEnum[offer.gearbox.vehicle_gearbox]}</span><span
                className="listing-card__time">{dayjs(offer.created_at).fromNow()}</span></div>
        </Link>
    )
}

export default OfferCard;