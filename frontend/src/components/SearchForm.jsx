import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useFormData} from "../hooks/useFormData.js";
import {useState} from "react";

const SearchForm = () => {
    const {login} = useAuth()
    const navigate = useNavigate();

    const { formData, handleChange } = useFormData({
        make: '',
        model: '',
        price_from: null,
        price_to: null,
        year_from: null
    })

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await (formData.email, formData.password);
            navigate("/");
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <form className="hero__search">
            <div className="hero__fields">
                <select className="select">
                    <option>Марка</option>
                    <option>BMW</option>
                    <option>Toyota</option>
                </select>
                <select className="select">
                    <option>Модель</option>
                    <option>3 серия</option>
                    <option>X5</option>
                </select>
                <input className="input" type="text" placeholder="Цена от" value="500 000"/>
                <input className="input" type="text" placeholder="Цена до" value="5 000 000"/>
                <input className="input" type="text" placeholder="Год от" value="2015"/>
                <button className="btn btn--primary btn--lg" type="submit">
                    <svg className="icon">
                        <use href="/assets/icons/sprite.svg#i-magnifier"/>
                    </svg>
                    Найти
                </button>
            </div>

            <span className="hero__counter">
          <svg className="icon" style={{width:"14px", height: "14px", color: "var(--brand-primary)"}}><use
              href="/assets/icons/sprite.svg#i-check"/></svg>
          152 348 объявлений с актуальными ценами
        </span>
        </form>
    )
}

export default SearchForm;