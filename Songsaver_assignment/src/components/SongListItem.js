import {FaTimesCircle } from "react-icons/fa"

export default function SongListItem({ song, handlePress }) {

    return(
        <tr className="wrapper_songtable_body_row">
            <td className="wrapper_songtable_body_row_item id">{song.id}</td>
            <td className="wrapper_songtable_body_row_item title">{song.title}</td>
            <td className="wrapper_songtable_body_row_item artist">{song.artist}</td>
            <td className="wrapper_songtable_body_row_item genre">{song.genre}</td>
            <td className="wrapper_songtable_body_row_item rating">{song.rating}</td>
            <td><FaTimesCircle className="wrapper_songtable_body_row_item_remove" onClick={() => handlePress(song.id)}/></td>
        </tr>

    )
}