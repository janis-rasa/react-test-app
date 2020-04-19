import React from "react";
import ResultTablesContainer from "./components/ResultTable/ResultTablesContainer";
import AddEditFormContainer from "./components/Form/AddEditFormContainer";

const App = () => {

	return (
		<div className="container container_app">
			<div className="row">
				<div className="col-md-6">
					<AddEditFormContainer />
				</div>
			</div>
			<div className="mt-6">
				<ResultTablesContainer/>
			</div>
		</div>
	)
}

export default App
