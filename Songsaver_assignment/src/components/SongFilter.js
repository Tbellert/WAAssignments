import { Checkbox } from "./Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { addFilter, removeFilter } from "../app/features/filter/filterSlice"
import { addsort } from "../app/features/sort/sortSlice"

export default function SongFilter() {
    const filter = useSelector(state => state.filters)
    const dispatch = useDispatch()
    
    function applyFilter(genre) {
        if (filter.includes(genre)) {
            dispatch(removeFilter(genre))
        } else {
            dispatch(addFilter(genre))
        }
    }

    const applySort = (event) => {
        console.log(event.target.value)
        const [column, direction] = event.target.value.split(" ")
        dispatch(addsort({ column: column, direction: direction }))
    }

    return(
        <div className="filterwrapper">
            <label className="filterwrapper_genre">Filter on genre:
                <Checkbox togglePreference={applyFilter} genre="rock"/>
                <Checkbox togglePreference={applyFilter} genre="pop" />
                <Checkbox togglePreference={applyFilter} genre="jazz" />
                <Checkbox togglePreference={applyFilter} genre="classic" />
            </label>

            <label className="filterwrapper_sortby" htmlFor="sort">Sort by:
                <select className="filterwrapper_sortby_select" id="sort" onChange={applySort} defaultValue="default">
                    <option className="filterwrapper_rating_select_option" value="default" disabled hidden>--Please Select--</option>
                    <option className="filterwrapper_sortby_select_option" value="title ascending">Song A/Z</option>
                    <option className="filterwrapper_sortby_select_option" value="title descending">Song Z/A</option>
                    <option className="filterwrapper_sortby_select_option" value="artist ascending">Artist A/Z</option>
                    <option className="filterwrapper_sortby_select_option" value="artist descending">Artist Z/A</option>
                    <option className="filterwrapper_sortby_select_option" value="rating ascending">Rating 1/5</option>
                    <option className="filterwrapper_sortby_select_option" value="rating descending">Rating 5/1</option>
                </select>
            </label>
        </div>
    )
}