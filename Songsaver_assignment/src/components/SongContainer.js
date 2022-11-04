import SongForm from "./SongForm";
import SongList from "./SongList";

export default function SongContainer() { 
      return (
        <div className="contentwrapper">
            <SongForm />
            <SongList />
        </div>
    );
}