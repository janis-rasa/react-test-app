import React from "react";

export type TableDataType = {
	id: number
	rows: Array<TableRowType>
}

export type TableRowType = {
	id: number
	name: string
	surname: string
	age: number
	city: string
}

export type FormPropsType = {
	formFields: Array<FormFieldsType>
	onSubmit: (formData: TableRowType) => void
	addEdit: number
}

export type TableRowDataType = {
	row: TableRowType
	rowId: number
	tableId: number
	tableRef: React.RefObject<HTMLTableElement>
}

export type FormFieldsType = {
	label: string
	name: string
	type: string
	yupObject: object
}

// Components props types

export type AddEditFormMapStatePropsType = {
	tableRowData: TableRowDataType
	formFields: Array<FormFieldsType>
}

export type AddEditFormMapDispatchPropsType = {
	editFormData: (formData: TableRowType, tableRowData: TableRowDataType) => void
	addFormData: (formData: TableRowType) => void
}

export type ResultTablesMapStatePropsType = AllTablesMapStatePropsType & TableMapStatePropsType

export type TableMapStatePropsType = {
	firstTableId: number
	tableHeadCellsNames: Array<string>
	tableRowData: TableRowDataType
}

export type  AllTablesMapStatePropsType = {
	tableData: Array<TableDataType>
	tableBlockRef: React.RefObject<HTMLTableElement>
	nextTable: boolean
}

export type ResultTablesMapDispatchPropsType = TableMapDispatchPropsType & AllTablesMapDispatchPropsType

export type TableMapDispatchPropsType = {
	copyTable: (tableId: number, tableRef: React.RefObject<HTMLTableElement>) => void
	deleteTable: (tableId: number) => void
	editTableRow: (tableId: number, rowId: number, tableRef: React.RefObject<HTMLTableElement>) => void
	deleteTableRow: (tableId: number, rowId: number) => void
	saveFirstTableRef: (tableRef: React.RefObject<HTMLTableElement>) => void
}

export type AllTablesMapDispatchPropsType = {
	scrollSuccess: (scrollResult: boolean) => void
}