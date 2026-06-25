import {useNavigate} from "react-router-dom";
import {useFormData} from "../hooks/useFormData.js";
import carsJSON from "../data/cars.json";

const SearchForm = () => {
    const navigate = useNavigate();
    const makes = Object.keys(carsJSON.brands);

    const {formData, handleChange} = useFormData({
        make: '',
        model: '',
        price_min: null,
        price_max: null,
        year_min: null,
    });

    const models = formData.make ? carsJSON.brands[formData.make] : [];

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(
            Object.entries(formData).filter(([, v]) => v).map(([k, v]) => [k, String(v)])
        );
        navigate(`/offers?${params.toString()}`);
    };

    return (
        <form className="hero__search" onSubmit={handleSubmit}>
            <div className="hero__fields">
                <select name="make" className="select" value={formData.make} onChange={handleChange}>
                    <option value="">Марка</option>
                    {makes.map(make => (
                        <option key={make} value={make}>{make}</option>
                    ))}
                </select>
                <select name="model" className="select" value={formData.model} onChange={handleChange}>
                    <option value="">Модель</option>
                    {models.map(model => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
                <input className="input" type="number" name="price_min" value={formData.price_min ?? ''} placeholder="Цена от" onChange={handleChange}/>
                <input className="input" type="number" name="price_max" value={formData.price_max ?? ''} placeholder="Цена до" onChange={handleChange}/>
                <input className="input" type="number" name="year_min" value={formData.year_min ?? ''} placeholder="Год от" onChange={handleChange}/>
                <button className="btn btn--primary btn--lg" type="submit">
                    <svg className="icon">
                        <use href="/assets/icons/sprite.svg#i-magnifier"/>
                    </svg>
                    Найти
                </button>
            </div>
            <span className="hero__counter">
                <svg className="icon" style={{width: "14px", height: "14px", color: "var(--brand-primary)"}}><use
                    href="/assets/icons/sprite.svg#i-check"/></svg>
                152 348 объявлений с актуальными ценами
            </span>
        </form>
    );
};

export default SearchForm;
