import * as yup from "yup"
import {FormFieldsType, TableDataType, TableRowDataType, TableRowType} from "../types/types";
import { ThunkAction } from 'redux-thunk'
import {AppStateType} from "./redux-store";
import React from "react";

const COPY_TABLE = 'COPY-TABLE'
const DELETE_TABLE = 'DELETE-TABLE'
const ADD_FORM_DATA = 'ADD-FORM-DATA'
const EDIT_FORM_DATA = 'EDIT-FORM-DATA'
const EDIT_TABLE_ROW = 'EDIT-TABLE-ROW'
const DELETE_TABLE_ROW = 'DELETE-TABLE-ROW'
const SCROLL_SUCCESS = 'SCROLL-SUCCESS'
const SAVE_FIRST_TABLE_REF = 'SAVE-FIRST-TABLE-REF'
const CLEAR_TABLE_ROW = 'CLEAR_TABLE_ROW'

const capitalizeCheck = /^[\p{Lu}]/gu

type InitialStateType = {
	tableData: Array<TableDataType>
	tableRowData: TableRowDataType
	tableHeadCellsNames: Array<string>
	firstTableId: number
	tableBlockRef: React.RefObject<HTMLTableElement>
	nextTable: boolean
	firstTableRef: React.RefObject<HTMLTableElement>
	formFields: Array<FormFieldsType>
}

const initialState: InitialStateType = {
	tableData: [
		{
			id: 1,
			rows: [
				{id: 1, name: 'John', surname: 'Doe', age: 36, city: 'London'},
				{id: 2, name: 'Mark', surname: 'Otto', age: 38, city: 'Berlin'},
				{id: 3, name: 'Kirk', surname: 'Douglas', age: 88, city: 'L.A.'},
			]
		},
		{
			id: 2,
			rows: [
				{id: 1, name: 'John2', surname: 'Doe2', age: 36, city: 'London2'},
				{id: 2, name: 'Mark2', surname: 'Otto2', age: 38, city: 'Berlin2'},
				{id: 3, name: 'Kirk2', surname: 'Douglas2', age: 88, city: 'L.A.2'},
			]
		}
	],
	tableRowData: {} as TableRowDataType,
	tableHeadCellsNames: [
		'Name',
		'Surname',
		'Age',
		'City'
	],
	firstTableId: 1,
	tableBlockRef: {} as React.RefObject<HTMLTableElement>,
	nextTable: false,
	firstTableRef: {} as React.RefObject<HTMLTableElement>,
	formFields: [
		{
			label: 'Name',
			name: 'name',
			type: 'text',
			yupObject: (yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').trim())
		},
		{
			label: 'Surname',
			name: 'surname',
			type: 'text',
			yupObject: (yup.string().required('Surname is required').min(2, 'Surname must be at least 2 characters').trim())
		},
		{
			label: 'Age',
			name: 'age',
			type: 'number',
			yupObject: (yup.number().required('Age is required').round('round').positive('Age must be greater than 0').typeError('Age is required'))
		},
		{
			label: 'City',
			name: 'city',
			type: 'text',
			yupObject: (yup.string().matches(capitalizeCheck, {
				message: 'The first letter must be capitalized',
				excludeEmptyString: true
			}).required('City is required').trim().min(2, 'City must be at least 2 characters'))
		}
	],
}

const tablesData = (state = initialState, action: TableDataActionTypes): InitialStateType => {

	const getTableIndex = (tableId: number) => {
		return state.tableData.findIndex(table => table.id === tableId)
	}

	switch (action.type) {

		case ADD_FORM_DATA:
			Object.assign(action.values, {id: Date.now()})
			return {
				...state,
				tableData: [
					...state.tableData.map(table =>
						table.id === state.firstTableId ? {
								...table,
								rows: [
									...table.rows,
									action.values as TableRowType
								]
							}
							: table
					),
				],
				tableBlockRef: state.firstTableRef,
				nextTable: false
			}

		case EDIT_TABLE_ROW:
			let tableData: TableDataType | undefined = state.tableData.find(table => table.id === action.tableId)

			let rowData = (tableData && tableData.rows.length) ? tableData.rows.find(row => row.id === action.rowId) : undefined

			if (rowData && rowData.id) {
				return {
					...state,
					tableRowData: {
						row: rowData,
						rowId: action.rowId,
						tableId: action.tableId,
						tableRef: action.tableRef
					},
					tableBlockRef: {} as React.RefObject<HTMLTableElement>
				}
			} else  {
				return state
			}

		case EDIT_FORM_DATA:
			return {
				...state,
				tableBlockRef: action.tableRowData.tableRef,
				nextTable: false,
				tableData: [
					...state.tableData.map(table =>
						table.id === action.tableRowData.tableId ? {
							...table,
							rows: table.rows.map(row =>
								row.id === action.values.id ? action.values : row
							)
						} : table
					)
				]
			}

		case COPY_TABLE:
			let tableIndex = getTableIndex(action.tableId)
			let table = {...state.tableData[tableIndex]}
			table.id = Date.now()
			return {
				...state,
				tableData: [
					...state.tableData.slice(0, tableIndex + 1),
					table,
					...state.tableData.slice(tableIndex + 1)
				],
				tableBlockRef: action.tableRef,
				nextTable: true
			}

		case DELETE_TABLE:
			return {
				...state,
				tableData: state.tableData.filter(item =>
					item.id !== action.tableId
				)
			}

		case DELETE_TABLE_ROW:
			return {
				...state,
				tableData: [
					...state.tableData.map(table =>
						table.id === action.tableId ? {
							...table,
							rows: table.rows.filter(row =>
								row.id !== action.rowId
							)
						} : table
					)
				],
			}

		case SCROLL_SUCCESS:
			return {
				...state,
				tableBlockRef: {} as React.RefObject<HTMLTableElement>,
				nextTable: false,
			}

		case SAVE_FIRST_TABLE_REF:
			return {
				...state,
				firstTableRef: action.tableRef
			}

		case CLEAR_TABLE_ROW:
			return {
				...state,
				tableRowData: {} as TableRowDataType
			}

		default:
			return state
	}
}

type TableDataActionTypes =
	AddFormDataACType
	| EditFormDataACType
	| DeleteTableRowACType
	| EditTableRowACType
	| CopyTableACType
	| DeleteTableACType
	| ScrollSuccessACType
	| SaveFirstTableRefACType
	| ClearTableRowACType

type AddFormDataACType = {
	type: typeof ADD_FORM_DATA
	values: Omit<TableRowType, "id">
}
const addFormDataAC = (values: Omit<TableRowType, "id">): AddFormDataACType => ({
	type: ADD_FORM_DATA,
	values: values
})

type EditFormDataACType = {
	type: typeof EDIT_FORM_DATA
	tableRowData: TableRowDataType
	values: TableRowType
}
const editFormDataAC = (values: TableRowType, tableRowData: TableRowDataType): EditFormDataACType => ({
	type: EDIT_FORM_DATA,
	tableRowData: tableRowData,
	values: values
})

type DeleteTableRowACType = {
	type: typeof DELETE_TABLE_ROW
	tableId: number
	rowId: number
}
const deleteTableRowAC = (tableId: number, rowId: number): DeleteTableRowACType => ({
	type: DELETE_TABLE_ROW,
	tableId: tableId,
	rowId: rowId
})

type EditTableRowACType = {
	type: typeof EDIT_TABLE_ROW
	tableId: number
	rowId: number
	tableRef: React.RefObject<HTMLTableElement>
}
const editTableRowAC = (tableId: number, rowId: number, tableRef: React.RefObject<HTMLTableElement>): EditTableRowACType => ({
	type: EDIT_TABLE_ROW,
	tableId: tableId,
	rowId: rowId,
	tableRef: tableRef
})

type CopyTableACType = {
	type: typeof COPY_TABLE
	tableId: number
	tableRef: React.RefObject<HTMLTableElement>
}
const copyTableAC = (tableId: number, tableRef: React.RefObject<HTMLTableElement>): CopyTableACType => ({
	type: COPY_TABLE,
	tableId: tableId,
	tableRef: tableRef
})

type DeleteTableACType = {
	type: typeof DELETE_TABLE
	tableId: number
}
const deleteTableAC = (tableId: number): DeleteTableACType => ({
	type: DELETE_TABLE,
	tableId: tableId
})

type ScrollSuccessACType = {
	type: typeof SCROLL_SUCCESS
}
const scrollSuccessAC = (): ScrollSuccessACType => ({
	type: SCROLL_SUCCESS
})

type SaveFirstTableRefACType = {
	type: typeof SAVE_FIRST_TABLE_REF
	tableRef: React.RefObject<HTMLTableElement>
}
const saveFirstTableRefAC = (tableRef: React.RefObject<HTMLTableElement>): SaveFirstTableRefACType => ({
	type: SAVE_FIRST_TABLE_REF,
	tableRef: tableRef
})

type ClearTableRowACType = {
	type: typeof CLEAR_TABLE_ROW
}
const clearTableRowAC = (): ClearTableRowACType => ({
	type: CLEAR_TABLE_ROW
})


type ThunkType = ThunkAction<void, AppStateType, unknown, TableDataActionTypes>

export const copyTable = (tableId: number, tableRef: React.RefObject<HTMLTableElement>): ThunkType => (dispatch) => {
	dispatch(copyTableAC(tableId, tableRef))
	dispatch(clearTableRowAC())
}

export const deleteTable = (tableId: number): ThunkType => (dispatch) => {
	dispatch(deleteTableAC(tableId))
	dispatch(clearTableRowAC())
}

export const editTableRow = (tableId: number, rowId: number, tableRef: React.RefObject<HTMLTableElement>): ThunkType => (dispatch) => {
	dispatch(editTableRowAC(tableId, rowId, tableRef))
}

export const deleteTableRow = (tableId: number, rowId: number): ThunkType => (dispatch) => {
	dispatch(deleteTableRowAC(tableId, rowId))
	dispatch(clearTableRowAC())
}
export const scrollSuccess = (scrollResult: boolean): ThunkType => (dispatch) => {
	if (scrollResult) {
		dispatch(scrollSuccessAC())
		dispatch(clearTableRowAC())
	}
}
export const saveFirstTableRef = (tableRef: React.RefObject<HTMLTableElement>): ThunkType => (dispatch) => {
	dispatch(saveFirstTableRefAC(tableRef))
}
export const addFormData = (values: Omit<TableRowType, "id">): ThunkType => (dispatch) => {
	dispatch(addFormDataAC(values))
	dispatch(clearTableRowAC())
}
export const editFormData = (values: TableRowType, tableRowData: TableRowDataType): ThunkType => (dispatch) => {
	dispatch(editFormDataAC(values, tableRowData))
	dispatch(clearTableRowAC())
}

export default tablesData
