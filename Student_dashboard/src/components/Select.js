export default function Select({ type, input, handleSelectChange}) {

    function handleChange(event) {
        handleSelectChange(event.target.value)
    }

    return (
        <div>
            <select className="w-full text-center mb-2" onChange={handleChange} >
                <option>--Click to select one {type}--</option>
                {input.map((item) => {
                    return (
                        <option 
                            key={item.name}
                            value={item.name}
                        >{item.name}
                        </option>
                    )})
                }
            </select>
        </div>
    )
}