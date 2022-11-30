import { useSelector } from "react-redux"

export function Checkbox({ toggleCheckbox, name, display }) {
    const filter = useSelector(state => state.data.filters)

    function handleChange() {
        toggleCheckbox(name)
    }

    return (
        <div>
        {display === "list" ? <input type="checkbox" onChange={handleChange} checked={!filter.includes(name)}/> 
        :<label className={name === "difficulty" ? "text-red-500 capitalize" : name === "fun" ? "text-amber-300 capitalize" : "capitalize"} >
                <input type="checkbox" onChange={handleChange} checked={name ==="average" || name==="line" ? filter.includes(name) : !filter.includes(name)}/>
        {name}</label>
        }
        </div>
    )
}