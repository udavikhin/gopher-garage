import {useState} from "react";

export function useFormData(initial) {
    const [formData, setFormData] = useState(initial);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        let parsedValue;
        switch(type) {
            case 'checkbox':
                parsedValue = checked;
                break;
            case 'number':
                parsedValue = value === '' ? null : Number(value);
                break;
            default:
                parsedValue = value;
                break;
        }
        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }))
    }

    const resetForm = () => {
        setFormData(initial)
    }

    return { formData, resetForm, handleChange }
}