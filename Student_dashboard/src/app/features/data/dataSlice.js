import { createSlice } from "@reduxjs/toolkit"
import data from "../../data/data.json"
import {students, assignments} from "../../data/mockData"

const initialState = {
    rawData: data,
    newData: data,
    students: students,
    assignments: assignments,
    filters: []
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addFilterStudent: (state, action) => {
            return {...state, 
                filters: [...state.filters, action.payload],
                newData: state.newData.filter(item => !item.name.includes(action.payload))
            }
        },        
        removeFilterStudent: (state, action) => {
            return {...state, 
                filters: state.filters.filter((item) => item !== action.payload), 
                newData: [...new Set([...state.newData, ...state.rawData.filter(item => item.name.includes(action.payload))])]
            }
        },
        addFilterAssignment: (state, action) => {
            return {...state, 
                filters: [...state.filters, action.payload],
                newData: state.newData.filter(item => !item.project.includes(action.payload))
            }
        },        
        removeFilterAssignment: (state, action) => {
            return {...state, 
                filters: state.filters.filter((item) => item !== action.payload), 
                newData: [...new Set([...state.newData, ...state.rawData.filter(item => item.project.includes(action.payload))])]
            }
        },
        addFilter: (state, action) => {
            return {...state, filters: [...state.filters, action.payload]}
        },        
        removeFilter: (state, action) => {
            return {...state, filters: state.filters.filter((item) => item !== action.payload)}
        },
    }
})

export const {addFilterStudent, addFilterAssignment, removeFilterStudent, removeFilterAssignment, addFilter, removeFilter} = dataSlice.actions

export default dataSlice.reducer