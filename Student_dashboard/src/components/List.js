import { Link } from "react-router-dom"
import { Checkbox } from "./Checkbox"

export default function List({ input, linkType, display, handleCheckboxOnChange, handleSelectButtonOnClick }) {
    const names = input.map(item => item.name)

    function handleCheckboxChange(name) {
        handleCheckboxOnChange(name)
    }
    
    function handleSelectButtonClick(event) {
        const eventNames = event.target.name.split(",")
        handleSelectButtonOnClick(eventNames)
    }
    return (
        <div >
            <ul className="flex flex-wrap justify-center gap-0.5">
                {input.map((item) => {
                    return ( 
                        <li key={item.name} className="w-20 ml-1 text-xs bg-slate-100 rounded-md">
                            <label className="flex gap-1 justify-center content-center">
                            {display === "list" ? <Checkbox toggleCheckbox={handleCheckboxChange} name={item.name} display="list"/> : null}
                            <Link to={`/${linkType}/${item.name}`}>{item.name}</Link>
                            </label>
                        </li>
                    )
                })}
            </ul>
            <h3 className="mt-2 text-center text-xs italic">Click on name of {linkType} to show detailed chart</h3>
            {display === "list" ?<button className="text-white p-2 w-32 bg-blue-500 rounded-full shadow-lg to-black m-2" onClick={handleSelectButtonClick} name={names}>Select All</button> : null}
        </div>
    )
}