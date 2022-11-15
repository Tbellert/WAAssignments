import { createSlice } from "@reduxjs/toolkit"
import data from "../../data/data.json"

const initialState = {
    rawData: data,
    newData: data,
    students:[
        {id: 1, name: 'Evelyn'}, 
        {id: 2, name: 'Aranka'}, 
        {id: 3, name: 'Floris'}, 
        {id: 4, name: 'Hector'}, 
        {id: 5, name: 'Martina'}, 
        {id: 6, name: 'Maurits'}, 
        {id: 7, name: 'Rahima'}, 
        {id: 8, name:'Sandra'}, 
        {id: 9, name: 'Wietske'}, 
        {id: 10, name: 'Storm'}],
    assignments: [],
    filters: []
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        filterData: (state, action) => {
            const studentsNames = state.students.map(item => item.name)
            if (!state.filters.includes(action.payload)) {
                if (studentsNames.includes(action.payload)) {
                    const toAdd = state.rawData.filter(item => item.name.includes(action.payload))
                    return {...state, newData: state.newData.concat(toAdd)}
                } else {
                    const toAdd = state.rawData.filter(item => item.project.includes(action.payload))
                    return {...state, newData: state.newData.concat(toAdd)}
                }
            } else {
                if (studentsNames.includes(action.payload)) {
                    return {...state, newData: state.newData.filter(item => !item.name.includes(action.payload)).map(item => item)}
                } else {
                    return {...state, newData: state.newData.filter(item => !item.project.includes(action.payload)).map(item => item)}
                }
            }
        },
        addFilter: (state, action) => {
            return {...state, filters: [...state.filters, action.payload]}
        },
        removeFilter: (state, action) => {
            return {...state, filters: state.filters.filter((word) => word !== action.payload)}
        },
        removeAllFilters: (state, action) => {
            return {...state, filters: state.filters.filter(item => !action.payload.includes(item))}
        },
    }
})

export const {addFilter, removeFilter, filterData, removeAllFilters} = dataSlice.actions

export default dataSlice.reducer