import { useSelector } from "react-redux"

export function Checkbox({ toggle, name, display }) {
    const filter = useSelector(state => state.data.filters)

    function handleChange() {
        toggle(name)
    }

    return (
        <div>
            {display === "list" ? <input type="checkbox" onChange={handleChange} checked={!filter.includes(name)}/> 
            :<label style={name === "difficulty" ? { color: "tomato", textTransform: "capitalize"} : name === "fun" ? {color: "gold", textTransform: "capitalize"} : {textTransform: "capitalize"}} >
                    <input type="checkbox" onChange={handleChange} checked={name ==="average" || name==="line" ? filter.includes(name) : !filter.includes(name)}/>
            {name}</label>
            }
        </div>
    )
}