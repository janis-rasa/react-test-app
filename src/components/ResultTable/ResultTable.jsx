import React from 'react'
import Table from 'react-bootstrap/Table'
import './ResultTable.scss'
import ResultTableRow from "./ResultTableRow";
import Button from "react-bootstrap/Button";

function ResultTable(props) {
	return (
		<div className="table-block" id={'table-block_' + props.index}>
			<div className="copy-tables">
				<Button
					variant="primary"
					size="sm"
					className="copy-tables__copy"
					onClick={props.copyTable.bind(null, props.index)}
				>
					Copy table
				</Button>
				{props.index ? (
				<Button
					variant="borderless"
					size="sm"
					className="mx-3 px-1 copy-tables__remove"
					onClick={props.deleteTable.bind(null, props.index)}
				>
					<span className="sr-only">Remove</span>
					<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
						<path id="btn_delete.svg_btn_delete.png"
						      data-name="btn_delete.svg, btn_delete.png"
						      className="svg__cls-1"
						      d="M623.246,435.991l3.377-3.378a1.278,1.278,0,0,0,0-1.8l-0.45-.45a1.276,1.276,0,0,0-1.8,0l-3.378,3.378-3.377-3.378a1.278,1.278,0,0,0-1.8,0l-0.451.45a1.278,1.278,0,0,0,0,1.8l3.377,3.377-3.377,3.378a1.278,1.278,0,0,0,0,1.8l0.451,0.45a1.278,1.278,0,0,0,1.8,0l3.377-3.377,3.378,3.377a1.278,1.278,0,0,0,1.8,0l0.45-.45a1.278,1.278,0,0,0,0-1.8Z"
						      transform="translate(-615 -430)"/>
					</svg>
				</Button>
				) : ''}
			</div>
			<Table bordered hover className="res-table" id={'table_' + props.index}>
				<thead className="res-table__thead">
				<tr className="res-table__tr res-table__tr_head">
					<td className="res-table__td res-table__td_head">Name</td>
					<td className="res-table__td res-table__td_head">Surname</td>
					<td className="res-table__td res-table__td_head">Age</td>
					<td className="res-table__td res-table__td_head">City</td>
					<td className="res-table__td res-table__td_head">&nbsp;</td>
				</tr>
				</thead>
				<tbody className="res-table__tbody">
					{ props.tableData.map(tableRow => {
						return <ResultTableRow
							key={tableRow.id}
							index={props.index}
							tableRow={tableRow}
							removeTableRow={props.removeTableRow}
							editTableRow={props.editTableRow}
						/>
					})}
				</tbody>
			</Table>
		</div>
	)
}

export default ResultTable
