import { configureStore } from '@reduxjs/toolkit'
import formReducer from '../Features/form/formSlice';

export const store = configureStore({
  reducer: {
    songs: formReducer,
  },
})