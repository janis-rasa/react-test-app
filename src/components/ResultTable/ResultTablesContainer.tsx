import {
	copyTable,
	deleteTable,
	editTableRow,
	deleteTableRow,
	scrollSuccess,
	saveFirstTableRef,
} from "../../redux/table-reducer"
import {connect} from "react-redux"
import ResultTables from "./ResultTables"
import {firstTableId, tableHeadCellsNames, nextTable, tableBlockRef, tableData, tableRowData} from "../../redux/table-selectors"
import {AppStateType} from "../../redux/redux-store"
import {ResultTablesMapDispatchPropsType, ResultTablesMapStatePropsType} from "../../types/types"

const mapStateToProps = (state: AppStateType): ResultTablesMapStatePropsType => {
	return {
		tableData: tableData(state),
		tableRowData: tableRowData(state),
		firstTableId: firstTableId(state),
		tableHeadCellsNames: tableHeadCellsNames(state),
		tableBlockRef: tableBlockRef(state),
		nextTable: nextTable(state)
	}
}

const ResultTablesContainer = connect<ResultTablesMapStatePropsType, ResultTablesMapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
	copyTable,
	deleteTable,
	editTableRow,
	deleteTableRow,
	scrollSuccess,
	saveFirstTableRef
})(ResultTables)

export default ResultTablesContainer
