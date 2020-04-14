import React from 'react'
import Table from 'react-bootstrap/Table'
import './ResultTable.scss'
import ResultTableRow from "./ResultTableRow/ResultTableRow";
import Button from "react-bootstrap/Button";
import {ReactComponent as RemoveButton} from "../../svg/btn_delete.svg";

const ResultTable = React.forwardRef((props, ref) => {

	const headCellsNames = [
		'Name',
		'Surname',
		'Age',
		'City'
	]

	const TableHeadCells = headCellsNames.map(
		(cell, index) => <td className="res-table__td res-table__td_head" key={index}>{cell}</td>
	)

	return (
		<div className="table-block"
		     ref={ref}
		     id={props.tableId}
		>
			<div className="copy-tables">
				<Button
					variant="primary"
					size="sm"
					className="copy-tables__copy"
					onClick={props.copyTable.bind(null, props.tableId)}
				>
					Copy table
				</Button>
				{props.tableId !== props.firstTableId ? (
					<Button
						variant="borderless"
						size="sm"
						className="mx-3 px-1 copy-tables__remove"
						onClick={props.deleteTable.bind(null, props.tableId)}
					>
						<span className="sr-only">Remove</span>
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
				{props.tableData.map((tableRow) => {
					return (
						<ResultTableRow
							key={tableRow.id}
							tableId={props.tableId}
							tableRow={tableRow}
							deleteTableRow={props.deleteTableRow}
							editTableRow={props.editTableRow}
						/>
					)
				})}
				</tbody>
			</Table>
		</div>
	)
})

export default ResultTable