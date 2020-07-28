import {AppStateType} from "./redux-store";

export const tableRowData = (state: AppStateType) => {
	return state.tablesData.tableRowData
}

export const formFields = (state: AppStateType) => {
	return state.tablesData.formFields
}

export const tableData = (state: AppStateType) => {
	return state.tablesData.tableData
}

export const firstTableId = (state: AppStateType) => {
	return state.tablesData.firstTableId
}

export const tableHeadCellsNames = (state: AppStateType) => {
	return state.tablesData.tableHeadCellsNames
}

export const tableBlockRef = (state: AppStateType) => {
	return state.tablesData.tableBlockRef
}

export const nextTable = (state: AppStateType) => {
	return state.tablesData.nextTable
}
