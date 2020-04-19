import React from 'react'
import Table from 'react-bootstrap/Table'
import './ResultTable.scss'
import ResultTableRow from "./ResultTableRow/ResultTableRow"
import Button from "react-bootstrap/Button"
import {ReactComponent as RemoveButton} from "../../svg/btn_delete.svg"

const ResultTable = (props) => {

	const tableRef = React.useRef(null)

	const TableHeadCells = props.headCellsNames.map(
		(cell, index) => <td className="res-table__td res-table__td_head" key={index}>{cell}</td>
	)

	const handleCopyTable = () => {
		props.copyTable(props.tableId, tableRef)
	}

	const handleDeleteTable = () => {
		const element = tableRef.current;
		const elementHeight = element.offsetHeight
		element.style.height = elementHeight + 'px'
		setTimeout(() => {
			element.classList.add("closing")
		}, 5)
		setTimeout(() => {
			props.deleteTable(props.tableId)
		}, 250)
	}

	const saveFirstTableRef = () => {
		if (props.tableId === props.firstTableId) {
			props.saveFirstTableRef(tableRef)
		}
	}

	React.useEffect(saveFirstTableRef)

	return (
		<div className="table-block" id={props.tableId} ref={tableRef}>
			<div className="copy-tables">
				<Button
					variant="primary"
					size="sm"
					className="copy-tables__copy"
					onClick={handleCopyTable}
				>
					Copy table
				</Button>
				{props.tableId !== props.firstTableId ? (
					<Button
						variant="borderless"
						size="sm"
						className="mx-3 px-1 copy-tables__remove"
						onClick={handleDeleteTable}
					>
						<span className="sr-only">Remove table</span>
						<RemoveButton/>
					</Button>
				) : ''}
			</div>
			<Table bordered hover className="res-table">
				<thead className="res-table__thead">
				<tr className="res-table__tr res-table__tr_head">
					{TableHeadCells}
					<td className="res-table__td res-table__td_head">&nbsp;</td>
				</tr>
				</thead>
				<tbody className="res-table__tbody">
				{props.tableData.map((row) => {
					return (
						<ResultTableRow
							key={row.id}
							tableId={props.tableId}
							rowData={row}
							tableRow={props.tableRow}
							deleteTableRow={props.deleteTableRow}
							editTableRow={props.editTableRow}
							tableRef={tableRef}
						/>
					)
				})}
				</tbody>
			</Table>
		</div>
	)
}

export default ResultTable