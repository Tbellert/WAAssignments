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
        applyFilters: (state, action) => {

            return {...state, newData: action.payload}
            // const currentFilters = state.filters.map(item => item)
            // console.log(currentFilters)
            // const studentsNames = state.students.map(item => item.name)
            // currentFilters.forEach(element => {
            //     if (studentsNames.includes(element)) {
            //         return {...state, newData: state.newData.filter(item => !item.name.includes(element))}
            //     } else {
            //         return {...state, newData: state.newData.filter(item => !item.project.includes(element))}
            //     }
            // })
           
        },
        addFilter: (state, action) => {
            return {...state, filters: [...state.filters, action.payload]}
        },        
        removeFilter: (state, action) => {
            return {...state, filters: state.filters.filter((item) => item !== action.payload)}
        },
        removeAllFilters: (state, action) => {
            return {...state, filters: state.filters.filter(item => !action.payload.includes(item))}
        },
    }
})

export const {addFilter, removeFilter, filterData, removeAllFilters, applyFilters} = dataSlice.actions

export default dataSlice.reducer