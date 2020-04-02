import React from 'react'
import AddEditForm from './components/Form/AddEditForm'
import ResultTable from './components/ResultTable/ResultTable'
import Button from 'react-bootstrap/Button'
import Context from "./context";


function App() {

	const [tableData, setTableData] = React.useState([
		{id: 1, Name: 'John', Surname: 'Doe', Age: 36, City: 'London'},
		{id: 2, Name: 'Mark', Surname: 'Otto', Age: 38, City: 'Berlin'},
		{id: 3, Name: 'Kirk', Surname: 'Douglas', Age: 88, City: 'L.A.'},
	])

	function removeTableRow(id) {
		setTableData(tableData.filter(rowData => rowData.id !== id))
	}

	function addData(values) {
		values['id'] = Date.now()
		setTableData([...tableData, values])
	}

	let editRow = '';
	function editTableRow(id) {
		editRow = tableData.find(row => row.id === id)
		console.log(editRow)
	}


	return (
		<Context.Provider value={{removeTableRow, addData, editTableRow}}>
			<div className="container container_app">
				<div className="row">
					<div className="col-md-6">
						<AddEditForm editRow={editRow} />
					</div>
				</div>
				{tableData.length ? (
					<div className="mt-6">
						<div className="copy-tables">
							<Button variant="primary" size="sm" className="copy-tables__copy">Copy table</Button>
							<Button variant="borderless" size="sm" className="mx-3 px-1 copy-tables__remove">
								<span className="sr-only">Remove</span>
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
									<path id="btn_delete.svg_btn_delete.png" data-name="btn_delete.svg, btn_delete.png"
									      className="svg__cls-1"
									      d="M623.246,435.991l3.377-3.378a1.278,1.278,0,0,0,0-1.8l-0.45-.45a1.276,1.276,0,0,0-1.8,0l-3.378,3.378-3.377-3.378a1.278,1.278,0,0,0-1.8,0l-0.451.45a1.278,1.278,0,0,0,0,1.8l3.377,3.377-3.377,3.378a1.278,1.278,0,0,0,0,1.8l0.451,0.45a1.278,1.278,0,0,0,1.8,0l3.377-3.377,3.378,3.377a1.278,1.278,0,0,0,1.8,0l0.45-.45a1.278,1.278,0,0,0,0-1.8Z"
									      transform="translate(-615 -430)"/>
								</svg>
							</Button>
						</div>
						<ResultTable tableData={tableData} />
					</div>

					) : (<p className="mt-5">Nothing to show</p>)}

			</div>
		</Context.Provider>
	)
}

export default App
