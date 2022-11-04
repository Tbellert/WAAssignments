import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        addFilter: (state, action) => {
            return [...state, action.payload]
        },
        removeFilter: (state, action) => {
            return state.filter((filter) => filter !== action.payload)
        }
    }
})

export const { addFilter, removeFilter } = filterSlice.actions

export default filterSlice.reducer