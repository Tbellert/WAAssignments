import {FaTimesCircle } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { removeItem } from "../Features/form/formSlice"

export default function SongListItem({song}) {
    const dispatch = useDispatch()

    const handleOnClick = (id) => {
        dispatch(removeItem(id))
    }

    return(
        <tr className="wrapper_songtable_body_row">
            <td className="wrapper_songtable_body_row_item id">{song.id}</td>
            <td className="wrapper_songtable_body_row_item title">{song.title}</td>
            <td className="wrapper_songtable_body_row_item artist">{song.artist}</td>
            <td className="wrapper_songtable_body_row_item genre">{song.genre}</td>
            <td className="wrapper_songtable_body_row_item rating">{song.rating}</td>
            <td><FaTimesCircle className="wrapper_songtable_body_row_item_remove" onClick={() => handleOnClick(song.id)}/></td>
        </tr>

    )
}