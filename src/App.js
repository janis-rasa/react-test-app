import React from 'react'
import AddEditForm from './components/Form/AddEditForm'
import ResultTable from './components/ResultTable/ResultTable'
import Button from 'react-bootstrap/Button'

function App() {
	return (
		<div className="container container_app">
			<div className="row">
				<div className="col-md-6">
					<AddEditForm />
				</div>
			</div>

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
				<ResultTable />
			</div>

		</div>
	)
}

export default App
