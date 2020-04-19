import {
	copyTableActionCreator,
	deleteTableActionCreator,
	editTableRowActionCreator,
	deleteTableRowActionCreator,
	scrollSuccessActionCreator,
	saveFirstTableRefActionCreator,
} from "../../redux/table-reducer";
import {connect} from "react-redux";
import ResultTables from "./ResultTables";

const headCellsNames = [
	'Name',
	'Surname',
	'Age',
	'City'
]

const mapStateToProps = (state) => {
	return {
		tableData: state.tablesData.tableData,
		tableRow: state.tablesData.tableRow,
		firstTableId: state.tablesData.firstTableId,
		headCellsNames: headCellsNames,
		tableBlockRef: state.tablesData.tableBlockRef,
		next: state.tablesData.nextTable
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		copyTable: (tableId, tableRef) => {
			dispatch(copyTableActionCreator(tableId, tableRef))
		},
		deleteTable: (tableId) => {
			dispatch(deleteTableActionCreator(tableId))
		},
		editTableRow: (tableId, rowId, tableRef) => {
			dispatch(editTableRowActionCreator(tableId, rowId, tableRef))
		},
		deleteTableRow: (tableId, rowId) => {
			dispatch(deleteTableRowActionCreator(tableId, rowId))
		},
		scrollSuccess: (scrollResult) => {
			dispatch(scrollSuccessActionCreator(scrollResult))
		},
		saveFirstTableRef: (tableRef) => {
			dispatch(saveFirstTableRefActionCreator(tableRef))
		}
	}
}

const ResultTablesContainer = connect(mapStateToProps,mapDispatchToProps)(ResultTables)

export default ResultTablesContainer
