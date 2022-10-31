import SongListItem from "./SongListItem"
import { useSelector, useDispatch } from "react-redux"
import emptylist from "../images/emptylist.jpg"
import { removeAll } from "../Features/form/formSlice" 

export default function SongList() {
    const dispatch = useDispatch()

    const handleOnClick = () => {
        dispatch(removeAll())
    }

    const songs = useSelector(state => state.songs)
    if (songs.length === 0) {
        return (
            <div className="emptylist">
                <h3 className="emptylist_title">No songs available.</h3>
                <img className="emptylist_image" src={emptylist} alt="empty"/>
            </div>
        )
    } else {
        return (
            <div className="wrapper">
                <h2 className="wrapper_title">My songs</h2>
                <table className="wrapper_songtable" style={{width: "100%"}}>
                    <thead className="wrapper_songtable_header">
                        <tr className="wrapper_songtable_header_row"> 
                            <th className="wrapper_songtable_header_row_item">#</th> 
                            <th className="wrapper_songtable_header_row_item">Song</th>
                            <th className="wrapper_songtable_header_row_item">Artist</th>
                            <th className="wrapper_songtable_header_row_item">Genre</th>
                            <th className="wrapper_songtable_header_row_item">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="wrapper_songtable_body">
                        {songs.map(song => (
                            <SongListItem 
                                key={song.id} 
                                song={ song } 
                            />
                        ))}
                    </tbody>
                </table>
                <button className="wrapper_songtable_deletebtn" onClick={handleOnClick}>Remove all songs</button>
            </div>

        )
    }

}