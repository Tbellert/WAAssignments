import SongForm from "./SongForm";
import SongList from "./SongList";
import SongFilter from "./SongFilter";

export default function SongContainer() { 
      return (
        <div className="contentwrapper">
            <SongForm />
            {/* <SongFilter /> */}
            <SongList />
        </div>
    );
}