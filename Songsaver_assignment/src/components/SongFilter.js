export default function SongFilter() {
    return(
        <div className="filterwrapper">
            <label 
                className="filterwrapper_label"
            >Filter on genre:</label>

            <input
            id="rock"
            className="filterwrapper_checkbox"
            type="checkbox"
            name="rock"
            value={""}
            ></input>
            <label htmlFor="rock">Rock</label>
            <input
            id="pop"
            className="filterwrapper_checkbox"
            type="checkbox"
            name="pop"
            value={""}
            ></input>
            <label htmlFor="pop">Pop</label>
            <input
            id="classic"
            className="filterwrapper_checkbox"
            type="checkbox"
            name="classic"
            value={""}
            ></input>
            <label htmlFor="classic">Classic</label>
            <input
            id="jazz"
            className="filterwrapper_checkbox"
            type="checkbox"
            name="jazz"
            value={""}
            ></input>
            <label htmlFor="jazz">Jazz</label>

            <label 
                className="filterwrapper_label" 
                htmlFor="rating">Filter on rating:
            </label>

            <select
                className="filterwrapper_select"
                id="rating"
            >
                <option
                    className="filterwrapper_select_option"
                >1
                </option>
                <option
                    className="filterwrapper_select_option"
                >2
                </option>
                <option
                    className="filterwrapper_select_option"
                >3
                </option>
                <option
                    className="filterwrapper_select_option"
                >4
                </option>
                <option
                    className="filterwrapper_select_option"
                >5
                </option>
            </select>


            <label 
                className="filterwrapper_label" 
                htmlFor="sort">Sort by:
            </label>

            <select
                className="filterwrapper_select"
                id="sort"
            >
                <option
                    className="filterwrapper_select_option"
                >Song A/Z
                </option>
                <option
                    className="filterwrapper_select_option"
                >Song Z/A
                </option>
                <option
                    className="filterwrapper_select_option"
                >Artist A/Z
                </option>
                <option
                    className="filterwrapper_select_option"
                >Artist Z/A
                </option>
                <option
                    className="filterwrapper_select_option"
                >Rating 1/5
                </option>
                <option
                    className="filterwrapper_select_option"
                >Rating 5/1
                </option>
            </select>
        </div>
    )
}