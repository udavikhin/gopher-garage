import {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createOffer, uploadOfferPhotos} from "../api/offers.js";
import carsJSON from "../data/cars.json";
import colorsJSON from "../data/colors.json";
import {useFormData} from "../hooks/useFormData.js";

const OfferForm = () => {
    const navigate = useNavigate();

    const { formData, handleChange } = useFormData({
        make: '',
        model: '',
        year: null,
        gearbox: 'auto',
        mileage: null,
        color: '',
        fuel: 'petrol',
        description: '',
        price: null,
        owners: null,
        negotiable: false
    })

    const makes = Object.keys(carsJSON.brands);
    const models = formData.make ? carsJSON.brands[formData.make] : [];

    const colors = Object.entries(colorsJSON);

    const [photos, setPhotos] = useState([]);
    const fileInputRef = useRef(null);

    const handlePhotoSelect = (e) => {
        const files = Array.from(e.target.files);
        setPhotos(prev => [...prev, ...files].slice(0, 20));
        e.target.value = '';
    };

    const removePhoto = (index) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const id = await createOffer(formData);
            if (photos.length > 0) await uploadOfferPhotos(id, photos);
            navigate(`/offers/${id}`);
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <header className="post-form__head">
                <h1 className="post-form__title">Новое объявление</h1>
                <p className="post-form__sub">Заполните основную информацию о вашем автомобиле.</p>
            </header>

            <section className="card">
                <h2 className="h-display-s">Основные данные</h2>
                <div className="post-form__grid">
                    <label className="field"><span className="field__label">Марка</span>
                        <select name="make" className="select" value={formData.make} onChange={handleChange} required>
                            <option value="" disabled>Выберите марку</option>
                            {makes.map((make) => (
                                <option key={make} value={make}>{make}</option>
                            ))}
                        </select>
                    </label>
                    <label className="field"><span className="field__label">Модель</span>
                        <select name="model" className="select" value={formData.model} onChange={handleChange} required>
                            <option value="" disabled>Выберите модель</option>
                            {models.map((model) => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                    </label>
                    <label className="field"><span className="field__label">Год выпуска</span><input
                        className="input" type="number" name="year" min="1900" max={(new Date()).getFullYear()} value={formData.year ?? ''} onChange={handleChange} required/></label>
                    <label className="field"><span className="field__label">Пробег, км</span><input
                        className="input" type="number" min="0" max="999999" name="mileage" value={formData.mileage ?? ''} onChange={handleChange} required/></label>
                    <label className="field"><span className="field__label">Цвет</span>
                        <select name="color" className="select" value={formData.color} onChange={handleChange} required>
                            <option value="" disabled>Выберите цвет</option>
                            {colors.map(([slug, color]) => (
                                <option key={slug} value={slug}>{color.name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="field"><span className="field__label">Владельцев по ПТС</span><input
                        className="input" type="number" min="1" max="100" name="owners" value={formData.owners ?? ''} onChange={handleChange} required/></label>
                    <div className="field"><span className="field__label">Коробка передач</span>
                        <div style={{display: "flex", gap: "24px", paddingTop: "6px"}}>
                            <label className="radio"><input type="radio" name="gearbox" value="auto" checked={formData.gearbox === 'auto'} onChange={handleChange} /><span
                                className="dot"></span>Автомат</label>
                            <label className="radio"><input type="radio" name="gearbox" value="manual" checked={formData.gearbox === 'manual'} onChange={handleChange} /><span className="dot"></span>Механика</label>
                        </div>
                    </div>
                    <label className="field"><span className="field__label">Топливо</span>
                        <select className="select" name="fuel" value={formData.fuel} onChange={handleChange} required>
                            <option value="" disabled>Выберите тип топлива</option>
                            <option value="petrol">Бензин</option>
                            <option value="diesel">Дизель</option>
                        </select>
                    </label>
                </div>
            </section>

            <section className="card">
                <h2 className="h-display-s">Фотографии</h2>
                <div className="post-form__upload" onClick={() => fileInputRef.current.click()}>
                    <svg className="icon">
                        <use href="/assets/icons/sprite.svg#i-cloud-upload"/>
                    </svg>
                    <span className="lead">Нажмите для выбора</span>
                    <span className="sub">До 20 фото, формат JPG/PNG, до 10 МБ каждая</span>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/png"
                    style={{display: 'none'}}
                    onChange={handlePhotoSelect}
                />
                <div className="post-form__thumbs">
                    {photos.map((file, i) => (
                        <div
                            key={i}
                            className="post-form__thumb"
                            style={{backgroundImage: `url(${URL.createObjectURL(file)})`}}
                        >
                            <span className="x" onClick={() => removePhoto(i)}>×</span>
                        </div>
                    ))}
                    {photos.length < 20 && (
                        <div className="post-form__thumb post-form__thumb--add" onClick={() => fileInputRef.current.click()}>+</div>
                    )}
                </div>
            </section>

            <section className="card">
                <h2 className="h-display-s">Описание и цена</h2>
                <label className="field"><span className="field__label">Описание</span>
                    <textarea className="textarea"
                        placeholder="Расскажите коротко о машине: история обслуживания, особенности комплектации, что важно знать покупателю."
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </label>
                <div className="post-form__grid">
                    <label className="field"><span className="field__label">Цена, ₽</span>
                        <input
                            className="input"
                            type="number"
                            name="price"
                            value={formData.price ?? ''}
                            min="0"
                            max="1000000000"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className="field" style={{justifyContent: "flex-end"}}>
                        <label className="checkbox"><input type="checkbox" name="negotiable" checked={formData.negotiable} onChange={handleChange}/><span className="box"></span>Готов к
                            торгу</label>
                    </div>
                </div>
            </section>

            <footer className="post-form__actions">
                <div className="right">
                    <button className="btn btn--primary">Разместить <svg className="icon">
                        <use href="/assets/icons/sprite.svg#i-arrow-right"/>
                    </svg></button>
                </div>
                { error && <p className="auth__error">{error}</p>}
            </footer>
        </form>
    )
}

export default OfferForm;