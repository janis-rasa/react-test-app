import React from 'react'
import Table from 'react-bootstrap/Table'
import './ResultTable.scss'
import ResultTableRow from "./ResultTableRow";

function ResultTable() {
	return (
		<Table bordered hover className="res-table">
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
				<ResultTableRow/>
				<ResultTableRow/>
			</tbody>
		</Table>
	)
}

export default ResultTable
