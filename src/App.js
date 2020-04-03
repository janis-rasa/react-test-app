import React from 'react'
import AddEditForm from './components/Form/AddEditForm'
import ResultTable from './components/ResultTable/ResultTable'
import update from 'immutability-helper';

// Editable table index
const indexTable = 0;

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			tableData: [
				[
					{id: 1, Name: 'John', Surname: 'Doe', Age: 36, City: 'London'},
					{id: 2, Name: 'Mark', Surname: 'Otto', Age: 38, City: 'Berlin'},
					{id: 3, Name: 'Kirk', Surname: 'Douglas', Age: 88, City: 'L.A.'},
				],
				[
					{id: 1, Name: 'John', Surname: 'Doe', Age: 36, City: 'London2'},
					{id: 2, Name: 'Mark', Surname: 'Otto', Age: 38, City: 'Berlin2'},
					{id: 3, Name: 'Kirk', Surname: 'Douglas', Age: 88, City: 'L.A.2'},
				]
			],
			editRow: []
		}
	}

	// Smooth scroll table into view
	scrollToTable = (tableIndex) => {
		setTimeout(() => {
			let tableId = 'table-block_' + tableIndex
			document.getElementById(tableId).scrollIntoView({behavior: 'smooth', block: 'start'})
		}, 200)
	}

	addFromData = (values) => {
		// Checking the id if it does not exist is a new record
		if (!values['id']) {
			values['id'] = Date.now()
			this.setState({
				tableData: update(this.state.tableData, {[indexTable]: {$push: [values]}}),
				editRow: []
			})
		} else {
			// We have id, let's update record
			let editedTableIndex = this.state.editRow[0]
			let index = this.state.tableData[editedTableIndex].findIndex(row => row.id === values['id'])
			if (index !== -1) {
				this.setState({
					tableData: update(this.state.tableData, {[editedTableIndex]: {[index]: {$merge: values}}}),
					editRow: []
				})
			} else {
				// Someone deleted a record while we where editing data put it back to table
				this.setState({
					tableData: update(this.state.tableData, {[editedTableIndex]: {$push: [values]}}),
					editRow: []
				})
			}
			// Some animation
			this.scrollToTable(editedTableIndex)
		}
	}

	removeTableRow = (index, id) => {
		// Adding class for animation
		let rowId = 'row_' + index + '_' + id
		document.getElementById(rowId).classList.add("closing");

		// Back to work
		setTimeout(() => {
			let arrayIndex = this.state.tableData[index].findIndex(row => row.id === id)
			if (arrayIndex !== -1) {
				this.setState({
					tableData: update(this.state.tableData, {[index]: {$splice: [[arrayIndex,1]]}}),
				})
			}
		},250)

	}

	editTableRow = (index, id) => {
		this.setState({
			editRow: [
				index, this.state.tableData[index].find(row => row.id === id)
			]
		})
		// Some animation
		document.body.scrollIntoView({behavior: 'smooth', block: 'start'})
	}

	copyTable = (index) => {
		let next = index + 1
		this.setState({
			tableData: update(this.state.tableData, {$splice: [[next, 0, this.state.tableData[index]]]}),
		})
		// Some animation
		this.scrollToTable(next)
	}

	deleteTable = (index) => {
		// Adding class for animation
		let tableId = 'table-block_' + index
		let elementHeight = document.getElementById(tableId).offsetHeight + 1;
		document.getElementById(tableId).style.height = elementHeight.toString() + 'px';
		setTimeout(() => {
			document.getElementById(tableId).classList.add("closing");
		},50)
		// Back to work
		setTimeout(() => {
			this.setState({
				tableData: update(this.state.tableData, {$splice: [[index, 1]]}),
			})
		}, 300)
	}

	render() {
		return (
			<div className="container container_app">
				<div className="row">
					<div className="col-md-6">
						<AddEditForm addFromData={this.addFromData} editRow={this.state.editRow} />
					</div>
				</div>
					<div className="mt-6">
						{ this.state.tableData.map((table, index) => {
							return <ResultTable
								tableData={table}
								removeTableRow={this.removeTableRow}
								editTableRow={this.editTableRow}
								key={index}
								index={index}
								copyTable={this.copyTable}
								deleteTable={this.deleteTable}
							/>
						})}
					</div>
			</div>
		)
	}
}

