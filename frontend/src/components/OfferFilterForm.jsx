import {useFormData} from "../hooks/useFormData.js";
import cars from "../data/cars.json";

const OfferFilterForm = ({ onSubmit, initialData = {} }) => {
    const makes = Object.keys(cars.brands);

    const { formData, resetForm, handleChange } = useFormData({
        make: initialData.make ?? '',
        model: initialData.model ?? '',
        price_min: initialData.price_min ?? null,
        price_max: initialData.price_max ?? null,
        year_min: initialData.year_min ?? null,
        year_max: initialData.year_max ?? null,
        gearbox: initialData.gearbox ?? ''
    });

    const models = formData.make ? cars.brands[formData.make] : [];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="filter-card" onSubmit={handleSubmit}>
            <div className="filter-card__head">
                <h3>Фильтры</h3>
                <a onClick={resetForm} style={{cursor: 'pointer'}}>Сбросить</a>
            </div>

            <div className="filter-card__group">
                <h4>Марка</h4>
                <select name="make" className="select" value={formData.make} onChange={handleChange}>
                    <option value="">Все марки</option>
                    {makes.map((make) => (
                        <option key={make} value={make}>{make}</option>
                    ))}
                </select>
            </div>

            <div className="filter-card__group">
                <h4>Модель</h4>
                <select name="model" className="select" value={formData.model} onChange={handleChange}>
                    <option value="">Все модели</option>
                    {models.map((model) => (
                        <option key={model} value={model}>{model}</option>
                    ))}
                </select>
            </div>

            <div className="filter-card__group">
                <h4>Цена, ₽</h4>
                <div className="filter-card__range">
                    <input className="input" type="number" name="price_min" value={formData.price_min ?? ''} placeholder="от" onChange={handleChange}/>
                    <input className="input" type="number" name="price_max" value={formData.price_max ?? ''} placeholder="до" onChange={handleChange}/>
                </div>
            </div>

            <div className="filter-card__group">
                <h4>Год выпуска</h4>
                <div className="filter-card__range">
                    <input className="input" type="number" name="year_min" value={formData.year_min ?? ''} placeholder="от" onChange={handleChange}/>
                    <input className="input" type="number" name="year_max" value={formData.year_max ?? ''} placeholder="до" onChange={handleChange}/>
                </div>
            </div>

            <div className="filter-card__group">
                <h4>Коробка передач</h4>
                <div className="filter-card__options">
                    <label className="radio"><input type="radio" name="gearbox" value="" checked={formData.gearbox === ''} onChange={handleChange}/><span className="dot"></span>Все</label>
                    <label className="radio"><input type="radio" name="gearbox" value="auto" checked={formData.gearbox === 'auto'} onChange={handleChange}/><span className="dot"></span>Автомат</label>
                    <label className="radio"><input type="radio" name="gearbox" value="manual" checked={formData.gearbox === 'manual'} onChange={handleChange}/><span className="dot"></span>Механика</label>
                </div>
            </div>

            <button type="submit" className="btn btn--primary btn--block">Показать</button>
        </form>
    )
}

export default OfferFilterForm;
