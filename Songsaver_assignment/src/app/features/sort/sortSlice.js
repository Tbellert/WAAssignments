import { createSlice } from "@reduxjs/toolkit"

const initialState = []

export const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        addsort: (state, action) => {
            return  {...action.payload}
        },
    }
})

export const { addsort } = sortSlice.actions

export default sortSlice.reducer