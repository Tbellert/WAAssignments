import SongListItem from "./SongListItem"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import emptylist from "../images/emptylist.jpg"
import SongFilter from "./SongFilter"
import { removeAll, removeItem } from "../app/features/form/formSlice" 

export default function SongList() {
    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs)
    const filter = useSelector(state => state.filters)
    const sort = useSelector(state => state.sort)

    const handlePress = (id) => {
        dispatch(removeItem(id))
    }

    const handleOnClick = () => {
        dispatch(removeAll())
    }

    const [standard, setStandard] = useState()

    function filterFunction(array) {
        return array.filter((song) => filter.includes(song.genre))
    }

    function sortFunction(object, array) {
        if (object.direction === "ascending") {
            return array.slice().sort((a, b) => (a[sort.column] > b[sort.column] ? 1 : -1))
        }
        if (object.direction === "descending") {
            return array.slice().sort((a, b) => (a[sort.column] < b[sort.column] ? 1 : -1))
        }
    }

    useEffect(() => {
        let derivedSongs = songs
        
        if (Object.keys(sort).length !== 0 && filter.length > 0) {
            derivedSongs = sortFunction(sort, filterFunction(songs))
        } else if (filter.length > 0) {
            derivedSongs = filterFunction(songs)
        } else if (Object.keys(sort).length !== 0) {
            derivedSongs = sortFunction(sort, songs)
        }

        setStandard(
            derivedSongs.map((song) => {
                return <SongListItem key={song.id} song={song} handlePress={handlePress} />
            })
        )
    }, [songs, filter, sort])

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
                <SongFilter />
                <table className="wrapper_songtable" style={{width: "100%"}}>
                    <thead className="wrapper_songtable_header">
                        <tr className="wrapper_songtable_header_row"> 
                            <th className="wrapper_songtable_header_row_item">#</th> 
                            <th className="wrapper_songtable_header_row_item">Title</th>
                            <th className="wrapper_songtable_header_row_item">Artist</th>
                            <th className="wrapper_songtable_header_row_item">Genre</th>
                            <th className="wrapper_songtable_header_row_item">Rating</th>
                        </tr>
                    </thead>
                    <tbody className="wrapper_songtable_body">
                        {standard}
                    </tbody>
                </table>
                <button className="wrapper_songtable_deletebtn" onClick={handleOnClick}>Remove all songs</button>
            </div>

        )
    }
}