import { useState } from "react"

export function Checkbox({ togglePreference, genre }) {
    const [checked, setChecked] = useState(false)

    const handleChange = () => {
        setChecked(!checked)
        togglePreference(genre)
    }

    return (
        <div className="filterwrapper_genre_cbwrapper">
            <label className="filterwrapper_genre_cbwrapper_label">
                <input className="filterwrapper_genre_cbwrapper_checkbox"type="checkbox" onChange={handleChange}/>
            {genre}</label>
        </div>
    )
}