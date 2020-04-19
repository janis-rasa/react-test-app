import update from 'immutability-helper'


const COPY_TABLE = 'COPY-TABLE'
const DELETE_TABLE = 'DELETE-TABLE'
const ADD_FORM_DATA = 'ADD-FORM-DATA'
const EDIT_FORM_DATA = 'EDIT-FORM-DATA'
const UPDATE_FORM_FIELDS = 'UPDATE-FORM-FIELDS'
const EDIT_TABLE_ROW = 'EDIT-TABLE-ROW'
const DELETE_TABLE_ROW = 'DELETE-TABLE-ROW'
const SCROLL_SUCCESS = 'SCROLL-SUCCESS'
const SAVE_FIRST_TABLE_REF = 'SAVE-FIRST-TABLE-REF'

const initialState = {
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
	tableRow: {},
	firstTableId: 1,
	tableBlockRef: null,
	nextTable: false,
	firstTableRef: null
}

const tablesData = (state = initialState, action) => {

	const setTableData = (spec, tableRef = null, next = false) => {
		try {
			if (tableRef && next) {
				state = {
					...state,
					tableBlockRef: tableRef,
					nextTable: true
				}
			} else if (tableRef && !next) {
				state = {
					...state,
					tableBlockRef: tableRef,
					nextTable: false
				}
			}
			return {
					...state,
					tableData: update(state.tableData, spec),
					tableRow: {}
				}
		} catch (e) {
			console.log(e)
		}
	}

	const getTableIndex = (tableId) => {
		return state.tableData.findIndex(table => table.id === tableId)
	}

	const getRowIndex = (tableId, rowId) => {
		return state.tableData[tableId].rows.findIndex(row => row.id === rowId)
	}

	let tableIndex = ''
	let rowIndex = ''

	switch (action.type) {

		case ADD_FORM_DATA:
			action.values['id'] = Date.now()
			tableIndex = getTableIndex(state.firstTableId)
			return setTableData({[tableIndex]: {rows: {$push: [action.values]}}}, state.firstTableRef)

		case EDIT_TABLE_ROW:
			tableIndex = getTableIndex(action.tableId)
			rowIndex = getRowIndex(tableIndex, action.rowId)
			const tableRow = state.tableData[tableIndex].rows[rowIndex]
			return {
				...state,
				tableRow: {
					row: tableRow,
					rowId: action.rowId,
					tableId: action.tableId,
					tableRef: action.tableRef
				},
				tableBlockRef: null
			}

		case EDIT_FORM_DATA:
			tableIndex = getTableIndex(action.tableRow.tableId)
			rowIndex = getRowIndex(tableIndex, action.tableRow.row['id'])
			return setTableData({[tableIndex]: {rows: {[rowIndex]: {$set: action.tableRow.row}}}}, action.tableRow.tableRef)

		case COPY_TABLE:
			const next = true
			tableIndex = getTableIndex(action.tableId)
			let table = {...state.tableData[tableIndex]}
			table.id = Date.now()
			return setTableData({$splice: [[[tableIndex + 1], 0, table]]}, action.tableRef, next)

		case DELETE_TABLE:
			tableIndex = getTableIndex(action.tableId)
			return setTableData({$splice: [[tableIndex, 1]]})

		case DELETE_TABLE_ROW:
			tableIndex = getTableIndex(action.tableId)
			rowIndex = getRowIndex(tableIndex, action.rowId)
			return setTableData({[tableIndex]: {rows: {$splice: [[rowIndex, 1]]}}})

		case SCROLL_SUCCESS:
			if (action.scrollResult) {
				return {
					...state,
					tableBlockRef: null,
					nextTable: false
				}
			} else {
				return state
			}

		case SAVE_FIRST_TABLE_REF:
			return {
				...state,
				firstTableRef: action.tableRef
			}

		case UPDATE_FORM_FIELDS:
			return {
				...state,
				tableRow: {
					...state.tableRow,
					row: action.values
				}
			}
		default:
			return state
	}
}

export const addFormDataActionCreator = (values) => ({
	type: ADD_FORM_DATA,
	values: values
})

export const editFormDataActionCreator = (tableRow) => ({
	type: EDIT_FORM_DATA,
	tableRow: tableRow
})

export const updateFormFieldsActionCreator = (values) => ({
	type: UPDATE_FORM_FIELDS,
	values: values
})

export const deleteTableRowActionCreator = (tableId, rowId) => ({
	type: DELETE_TABLE_ROW,
	tableId: tableId,
	rowId: rowId
})

export const editTableRowActionCreator = (tableId, rowId, tableRef) => ({
	type: EDIT_TABLE_ROW,
	tableId: tableId,
	rowId: rowId,
	tableRef: tableRef
})

export const copyTableActionCreator = (tableId, tableRef) => ({
	type: COPY_TABLE,
	tableId: tableId,
	tableRef: tableRef
})

export const deleteTableActionCreator = (tableId) => ({
	type: DELETE_TABLE,
	tableId: tableId
})

export const scrollSuccessActionCreator = (scrollResult) => ({
	type: SCROLL_SUCCESS,
	scrollResult: scrollResult
})

export const saveFirstTableRefActionCreator = (tableRef) => ({
	type: SAVE_FIRST_TABLE_REF,
	tableRef: tableRef
})

export default tablesData