import React from "react";
import AddEditForm from './components/Form/AddEditForm'
import ResultTable from './components/ResultTable/ResultTable'
import update from 'immutability-helper';

// Editable table index
const firstTableKey = 1;

export default class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			tableData: [
				{
					1: [
						{id: 1, Name: 'John', Surname: 'Doe', Age: 36, City: 'London'},
						{id: 2, Name: 'Mark', Surname: 'Otto', Age: 38, City: 'Berlin'},
						{id: 3, Name: 'Kirk', Surname: 'Douglas', Age: 88, City: 'L.A.'},
					]
				},
				{
					2: [
						{id: 1, Name: 'John2', Surname: 'Doe2', Age: 36, City: 'London2'},
						{id: 2, Name: 'Mark2', Surname: 'Otto2', Age: 38, City: 'Berlin2'},
						{id: 3, Name: 'Kirk2', Surname: 'Douglas2', Age: 88, City: 'L.A.2'},
					]
				}
			],
			editRow: [],
		}
	}

	// Smooth scroll table into view
	scrollToTable = (tableKey) => {
		setTimeout(() => {
			const tableId = 'table-block_' + tableKey
			document.getElementById(tableId).scrollIntoView({behavior: 'smooth', block: 'start'})
		}, 250)
	}

	// Set state
	setStateData = (spec) => {

		this.setState({
			tableData: update(this.state.tableData, spec),
			editRow: []
		})

	}

	addFromData = (values) => {
		// Checking the id if it does not exist, this is a new record
		if (!values['id']) {
			values['id'] = Date.now()
			this.setStateData({0: {[firstTableKey]: {$push: [values]}}})
			// Some animation
			this.scrollToTable(firstTableKey)
		} else {
			// We have id, let's update record
			const editedTableIndex = this.state.editRow[0]
			const tableId = Object.keys(this.state.tableData[editedTableIndex])[0]
			const table = this.state.tableData[editedTableIndex][tableId]
			const rowIndex = table.findIndex(row => row.id === values['id'])
			if (rowIndex !== -1) {
				this.setStateData({[editedTableIndex]: {[tableId]: {[rowIndex]: {$set: values}}}})
			}
			// Some animation
			this.scrollToTable(tableId)
		}
	}

	deleteTableRow = (index, tableId, id) => {
		// Adding class for animation
		const rowId = 'row_' + tableId + '_' + id
		document.getElementById(rowId).classList.add("closing");

		// Back to work
		setTimeout(() => {
			const table = this.state.tableData[index][Object.keys(this.state.tableData[index])[0]]
			const rowIndex = table.findIndex(row => row.id === id)
			if (rowIndex !== -1) {
				this.setStateData({[index]: {[tableId]: {$splice: [[rowIndex, 1]]}}})
			}
		}, 250)

	}

	editTableRow = (index, id) => {
		const table = this.state.tableData[index][Object.keys(this.state.tableData[index])[0]]
		this.setState({
			editRow: [
				index, table.find(row => row.id === id)
			]
		})
		// Some animation
		document.body.scrollIntoView({behavior: 'smooth', block: 'start'})
	}

	copyTable = (index) => {
		let next = Date.now();
		const table = this.state.tableData[index]
		this.setStateData({$splice: [[index + 1, 0, {[next]: table[Object.keys(table)[0]]}]]})
		// Some animation
		this.scrollToTable(next)
	}

	deleteTable = (index, id) => {
		// Adding class for animation
		const tableId = 'table-block_' + id
		const element = document.getElementById(tableId)
		const elementHeight = element.offsetHeight + 1
		element.style.height = elementHeight.toString() + 'px'
		setTimeout(() => {
			element.classList.add("closing")
		}, 5)
		// Back to work
		setTimeout(() => {
			this.setStateData({$splice: [[index, 1]]})
		}, 300)
	}

	handleScrollToTop = () => {
		document.body.scrollIntoView({behavior: 'smooth', block: 'start'})
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleWatchScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleWatchScroll)
	}

	handleWatchScroll = () => {
		const scrollButton = document.getElementById("scroll-top-top");
		if (window.scrollY > 10) {
			scrollButton.classList.add('d-block')
		} else {
			scrollButton.classList.remove('d-block')
		}

		if (window.scrollY > 100) {
			scrollButton.classList.remove('invisible')
		} else {
			scrollButton.classList.add('invisible')
		}
	}

	render() {
		return (
			<div className="container container_app">
				<button type="button"
				        className="scroll-top invisible"
				        id="scroll-top-top"
				        onClick={this.handleScrollToTop}
				>
					<span className="sr-only">Scroll to top</span>
				</button>
				<div className="row">
					<div className="col-md-6">
						<AddEditForm
							addFromData={this.addFromData}
							editRow={this.state.editRow}
						/>
					</div>
				</div>
				<div className="mt-6" id="tables">
					{this.state.tableData.map((table, index) => {
						return <ResultTable
							tableData={table[Object.keys(table)[0]]}
							deleteTableRow={this.deleteTableRow}
							editTableRow={this.editTableRow}
							key={parseInt(Object.keys(table)[0])}
							index={index}
							tableVisibility={this.state.isTableVisible}
							tableId={parseInt(Object.keys(table)[0])}
							copyTable={this.copyTable}
							deleteTable={this.deleteTable}
							firstTableKey={firstTableKey}
						/>
					})}
				</div>
			</div>
		)
	}
}

