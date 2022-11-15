import { useState } from "react"

export function Checkbox({ togglePreference, genre }) {
    const [checked, setChecked] = useState(false)

    const handleChange = () => {
        setChecked(!checked)
        togglePreference(genre)
    }

    return (
        <div className="filterwrapper_genre_cbwrapper">
            <input className="filterwrapper_genre_cbwrapper_checkbox"type="checkbox" onChange={handleChange}/>
            <label className="filterwrapper_genre_cbwrapper_label">{genre}</label>
        </div>
    )
}