import * as yup from "yup";


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
	firstTableRef: null,
	formFields: [
		{
			label: 'Name',
			name: 'name',
			type: 'text',
			yupObject: (yup.string().matches(/^[^ ]+/, {
				message: 'Enter a valid Name',
				excludeEmptyString: true
			}).required('Name is required'))
		},
		{
			label: 'Surname',
			name: 'surname',
			type: 'text',
			yupObject: (yup.string().matches(/^[^ ]+/, {
				message: 'Enter a valid Name',
				excludeEmptyString: true
			}).required('Surname is required'))
		},
		{
			label: 'Age',
			name: 'age',
			type: 'number',
			yupObject: (yup.number().required('Age is required').moreThan(0, 'Age must be greater than 0'))
		},
		{
			label: 'City',
			name: 'city',
			type: 'text',
			yupObject: (yup.string().matches(/^[^ ]+/, {
				message: 'Enter a valid City',
				excludeEmptyString: true
			}).required('City is required'))
		}
	],
}

const tablesData = (state = initialState, action) => {

	const getTableIndex = (tableId) => {
		return state.tableData.findIndex(table => table.id === tableId)
	}

	switch (action.type) {

		case ADD_FORM_DATA:
			action.values['id'] = Date.now()
			return {
				...state,
				tableData: [
					...state.tableData.map(table =>
						table.id === state.firstTableId ? {
								...table,
								rows: [
									...table.rows,
									action.values
								]
							}
							: table
					),
				],
				tableBlockRef: state.firstTableRef,
				nextTable: false,
				tableRow: {}
			}

		case EDIT_TABLE_ROW:
			let tableRowData = state.tableData.find(table =>
				table.id === action.tableId
			).rows.find(row =>
				row.id === action.rowId
			)
			return {
				...state,
				tableRow: {
					row: tableRowData,
					rowId: action.rowId,
					tableId: action.tableId,
					tableRef: action.tableRef
				},
				tableBlockRef: null
			}

		case EDIT_FORM_DATA:
			return {
				...state,
				tableRow: {},
				tableBlockRef: action.tableRow.tableRef,
				nextTable: false,
				tableData: [
					...state.tableData.map(table =>
						table.id === action.tableRow.tableId ? {
							...table,
							rows: table.rows.map(row =>
								row.id === action.tableRow.row['id'] ? action.tableRow.row : row
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
				tableRow: {},
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