import { configureStore } from '@reduxjs/toolkit'
import formReducer from './features/form/formSlice'
import filterReducer from "./features/filter/filterSlice"
import sortReducer from "./features/sort/sortSlice"

export const store = configureStore({
  reducer: {
    songs: formReducer,
    filters: filterReducer,
    sort: sortReducer, 
  },
})