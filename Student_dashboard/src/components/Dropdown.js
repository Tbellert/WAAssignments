import { Link, useLocation } from "react-router-dom"
import { Checkbox } from "./Checkbox"

export default function Dropdown({ isOpen, input, linkType, display, handleOnChange, handleOnClick }) {
    const location = useLocation()
    const { pathname } = location
    const splitLocation = pathname.split("/")
    const names = input.map(item => item.name)

    function handleChange(name) {
        handleOnChange(name)
    }
    
    function handleClick(event) {
        const eventNames = event.target.name.split(",")
        handleOnClick(eventNames)
    }
    return (
        <div style={display === "list" ? {display: "inline-block"} : isOpen ? {display: "inline-block", height: "fit-content"} : {display: "none"}}>
            <ul style={display === "list" ? {display: "flex", flexWrap: "wrap", justifyContent: "center", listStyleType: "none"} : {listStyleType: "none"}}>
                {input.map((item) => {
                    return ( 
                        <li key={item.name}>
                            <label style={{display: "flex"}}>
                            {display === "list" ? <Checkbox toggle={handleChange} name={item.name} display="list"/> : null}
                            <Link 
                            className={splitLocation[2] === item.name ? "active" : ""} 
                            to={`/${linkType}/${item.name}`}
                            >{item.name}
                            </Link>
                            </label>
                        </li>
                    )
                })}
            </ul>
            {display === "list" ?<button onClick={handleClick} name={names}>Select All</button> : null}
        </div>
    )
}