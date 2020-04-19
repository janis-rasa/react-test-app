import React from 'react'
import ResultTable from "./ResultTable";
import scrollToElement from "../ScrollToElement/ScrollToElement"

const ResultTables = (props) => {

	const scrollTo = () => {
		if (props.tableBlockRef && props.next) {
			scrollToElement(props.tableBlockRef.current.nextElementSibling, props.scrollSuccess)
		} else if (props.tableBlockRef) {
			scrollToElement(props.tableBlockRef.current, props.scrollSuccess)
		} else if (Object.keys(props.tableRow).length) {
			window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
		}
	}

	React.useEffect(scrollTo)

	return (
		<React.Fragment>
		{props.tableData.map(table =>
			<ResultTable
				tableData={table.rows}
				key={table.id}
				tableId={table.id}
				firstTableId={props.firstTableId}
				headCellsNames={props.headCellsNames}
				copyTable={props.copyTable}
				deleteTable={props.deleteTable}
				deleteTableRow={props.deleteTableRow}
				editTableRow={props.editTableRow}
				tableRow={props.tableRow}
				saveFirstTableRef={props.saveFirstTableRef}
			/>
		)}
		</React.Fragment>
	)
}

export default ResultTables