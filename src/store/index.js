import { rootReducer } from './rootReducer'
import { configureStore } from '@reduxjs/toolkit'

//! Redux mới - Redux ToolKit
export const store = configureStore({
    reducer: rootReducer
})