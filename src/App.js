import React from "react";
import AddEditForm from './components/Form/AddEditForm'
import ResultTable from './components/ResultTable/ResultTable'
import update from 'immutability-helper';
import smoothScroll from 'smoothscroll-polyfill';

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			tableData: [
				{
					id: 1,
					rows: [
						{id: 1, Name: 'John', Surname: 'Doe', Age: 36, City: 'London'},
						{id: 2, Name: 'Mark', Surname: 'Otto', Age: 38, City: 'Berlin'},
						{id: 3, Name: 'Kirk', Surname: 'Douglas', Age: 88, City: 'L.A.'},
					]
				},
				{
					id: 2,
					rows: [
						{id: 1, Name: 'John2', Surname: 'Doe2', Age: 36, City: 'London2'},
						{id: 2, Name: 'Mark2', Surname: 'Otto2', Age: 38, City: 'Berlin2'},
						{id: 3, Name: 'Kirk2', Surname: 'Douglas2', Age: 88, City: 'L.A.2'},
					]
				}
			],
			editRow: {},
		}
		this.tableRef = []
		this.firstTableId = 1
		smoothScroll.polyfill()
	}

	// Smooth scroll table into view
	scrollToTable = (table) => {
		setTimeout(() => {
			table.scrollIntoView({behavior: 'smooth', block: 'start'})
		}, 250)
	}

	// Set state
	setStateData = (spec, tableRef = null) => {
		try {
			this.setState({
					tableData: update(this.state.tableData, spec),
					editRow: {}
				}, () => {
					if (tableRef) {
						this.scrollToTable(tableRef.nextElementSibling)
					}
				}
			)
		} catch (e) {
			console.log(e)
		}
	}

	getTableIndex = (tableId) => {
		return this.state.tableData.findIndex(table => table.id === tableId)
	}

	getRowIndex = (tableId, rowId) => {
		return this.state.tableData[tableId].rows.findIndex(row => row.id === rowId)
	}

	addFormData = (values) => {
		// Checking the id if it does not exist, this is a new record
		if (!Object.keys(this.state.editRow).length) {
			values['id'] = Date.now()
			const tableIndex = this.getTableIndex(this.firstTableId)
			this.setStateData({[tableIndex]: {rows: {$push: [values]}}})
			// Some animation
			this.scrollToTable(this.firstTableRef)
		} else {
			// We have editRow, let's update record
			const editedTableIndex = this.getTableIndex(this.state.editRow.tableId)
			const rowIndex = this.getRowIndex(editedTableIndex, values['id'])
			this.setStateData({[editedTableIndex]: {rows: {[rowIndex]: {$set: values}}}})
			// Some animation
			this.scrollToTable(this.tableRef[editedTableIndex])
		}
	}

	deleteTableRow = (tableId, rowId, rowRef) => {
		// Adding class for animation
		const tableIndex = this.getTableIndex(tableId)
		rowRef.current.classList.add("closing")
		// Back to work
		setTimeout(() => {
			const rowIndex = this.getRowIndex(tableIndex, rowId)
			this.setStateData({[tableIndex]: {rows: {$splice: [[rowIndex, 1]]}}})
		}, 250)
	}

	editTableRow = (tableId, rowId) => {
		const tableIndex = this.getTableIndex(tableId)
		const rowIndex = this.getRowIndex(tableIndex, rowId)
		const tableRow = this.state.tableData[tableIndex].rows[rowIndex]
		this.setState({
			editRow: {
				row: tableRow,
				rowId: rowId,
				tableId: tableId
			}
		})
		// Some animation
		window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
	}

	copyTable = (tableId) => {
		const newTableId = Date.now()
		const tableIndex = this.getTableIndex(tableId)
		const table = Object.create(this.state.tableData[tableIndex])
		table.id = newTableId
		this.setStateData({$splice: [[[tableIndex + 1], 0, table]]}, this.tableRef[tableIndex])
	}

	deleteTable = (tableId) => {
		// Adding class for animation
		const tableIndex = this.state.tableData.findIndex(table => table.id === tableId)
		const element = this.tableRef[tableIndex];
		const elementHeight = element.offsetHeight + 1
		element.style.height = elementHeight + 'px'
		setTimeout(() => {
			element.classList.add("closing")
		}, 5)
		// Back to work
		setTimeout(() => {
			this.setStateData({$splice: [[tableIndex, 1]]})
		}, 300)
	}

	render() {
		return (
			<div className="container container_app">
				<div className="row">
					<div className="col-md-6">
						<AddEditForm
							addFormData={this.addFormData}
							editFormData={this.editFormData}
							editRow={this.state.editRow}
						/>
					</div>
				</div>
				<div className="mt-6">
					{this.state.tableData.map((table, index) => {
						return (
							<ResultTable
								tableData={table.rows}
								deleteTableRow={this.deleteTableRow}
								editTableRow={this.editTableRow}
								key={table.id}
								tableId={table.id}
								copyTable={this.copyTable}
								deleteTable={this.deleteTable}
								firstTableId={this.firstTableId}
								ref={ref => {
									this.tableRef[index] = ref
									if (table.id === this.firstTableId) {
										this.firstTableRef = this.tableRef[index]
									}
								}}
							/>
						)
					})}
				</div>
			</div>
		)
	}
}

