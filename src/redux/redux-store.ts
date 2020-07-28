import {applyMiddleware, combineReducers, createStore} from "redux"
import tablesData from "./table-reducer"
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers({
	tablesData: tablesData,
	form: formReducer
})

export type AppStateType = ReturnType<typeof reducers>

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store