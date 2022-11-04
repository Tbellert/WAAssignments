import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        addSong: (state, action) => {
            return (
                [...state],
                [...state, action.payload]
            )
        },
        removeAll: (state) => {
            return (
                state = []
            )
        },
        removeItem: (state, action) => {
            return (
               state.filter((song) => song.id !== action.payload)
            )
        }
    }
})

export const { addSong, removeAll, removeItem } = formSlice.actions

export default formSlice.reducer