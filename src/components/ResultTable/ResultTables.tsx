import React from 'react'
import ResultTable from "./ResultTable"
import scrollToElement from "../../common/scrollToElement/scrollToElement"
import {ResultTablesMapDispatchPropsType, ResultTablesMapStatePropsType} from "../../types/types";

type PropsType = ResultTablesMapStatePropsType & ResultTablesMapDispatchPropsType

const ResultTables: React.FC<PropsType> = (props) => {

	const scrollTo = () => {
		if (props.tableBlockRef.current && props.nextTable) {
			scrollToElement(props.tableBlockRef.current.nextElementSibling, props.scrollSuccess)
		} else if (props.tableBlockRef && props.tableBlockRef.current) {
			scrollToElement(props.tableBlockRef.current, props.scrollSuccess)
		} else if (Object.keys(props.tableRowData).length) {
			window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
		}
	}

	React.useEffect(() => {
		scrollTo()
	})

	return (
		<>
		{props.tableData.map(table =>
			<ResultTable
				tableRowsData={table.rows}
				key={table.id}
				tableId={table.id}
				firstTableId={props.firstTableId}
				tableHeadCellsNames={props.tableHeadCellsNames}
				copyTable={props.copyTable}
				deleteTable={props.deleteTable}
				deleteTableRow={props.deleteTableRow}
				editTableRow={props.editTableRow}
				tableRowData={props.tableRowData}
				saveFirstTableRef={props.saveFirstTableRef}
			/>
		)}
		</>
	)
}

export default ResultTables