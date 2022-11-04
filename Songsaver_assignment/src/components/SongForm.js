import { useSelector, useDispatch } from "react-redux"
import { addSong } from "../app/features/form/formSlice"
import { useForm } from "react-hook-form"

export default function SongForm() {
    const songs = useSelector(state => state.songs)
    const dispatch = useDispatch()
    const { register, formState: { errors }, handleSubmit, reset} = useForm()

    const onSubmit = (data) => {
        const newData = {
            id: songs.length +1,
            title: data.title,
            artist: data.artist,
            genre: data.genre,
            rating: data.rating
        }
        dispatch(addSong(newData))
        reset()
    }

    return(
        <form 
            className="songformwrapper"
            onSubmit={handleSubmit(onSubmit)}
        >   
            <input
                className="songformwrapper_input"
                type="text"
                name="title"
                {...register("title", {required: "This input is required"})}
                aria-invalid={errors.title ? "true" : "false"} 
                placeholder="Songtitle"
            />
            {errors.title && <span className="songformwrapper_input_error" role="alert">{errors.title?.message}</span>}

            <input
                className="songformwrapper_input"
                type="text"
                name="artist"
                {...register("artist", {required: "This input is required"})}
                aria-invalid={errors.artist ? "true" : "false"}
                placeholder="Artist"
            />
            {errors.artist && <span className="songformwrapper_input_error" role="alert">{errors.artist?.message}</span>}

            <label htmlFor="genre" className="songformwrapper_label">Genre:
                <select 
                    id="genre" 
                    className="songformwrapper_label_select"
                    name="genre"
                    {...register("genre", {required: "This input is required"})}
                    aria-invalid={errors.genre ? "true" : "false"}
                >
                    <option className="songformwrapper_label_select_option">--Please Select--</option>
                    <option className="songformwrapper_label_select_option" value="rock">Rock</option>
                    <option className="songformwrapper_label_select_option" value="pop">Pop</option>
                    <option className="songformwrapper_label_select_option" value="classic">Classic</option>
                    <option className="songformwrapper_label_select_option" value="jazz">Jazz</option>
                </select>
            </label>
            {errors.genre && <span className="songformwrapper_input_error" role="alert">{errors.genre?.message}</span>}

            <label htmlFor="rating" className="songformwrapper_label">Rating:
                <select 
                    id="rating" 
                    className="songformwrapper_label_select"
                    name="rating"
                    {...register("rating", {required: "This input is required"})}
                    aria-invalid={errors.rating ? "true" : "false"}
                >
                    <option className="songformwrapper_label_select_option">--Please Select--</option>
                    <option className="songformwrapper_label_select_option" value="1">1</option>
                    <option className="songformwrapper_label_select_option" value="2">2</option>
                    <option className="songformwrapper_label_select_option" value="3">3</option>
                    <option className="songformwrapper_label_select_option" value="4">4</option>
                    <option className="songformwrapper_label_select_option" value="5">5</option>
                </select>
            </label>
            {errors.rating && <span className="songformwrapper_input_error" role="alert">{errors.rating?.message}</span>}

            <button 
                className="songformwrapper_btn"
            >Add Song</button>
    </form>
    )
}