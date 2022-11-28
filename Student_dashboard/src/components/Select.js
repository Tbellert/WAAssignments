export default function Select({ input, handleSelectChange}) {

    function handleChange(event) {
        handleSelectChange(event.target.value)
    }

    return (
        <div>
            <select onChange={handleChange} >
                <option>--Select--</option>
                {input.map((item) => {
                    return (
                        <option 
                            key={item.name}
                            value={item.name}
                        >{item.name}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}