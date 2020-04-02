import React from 'react'
import Button from 'react-bootstrap/Button'

function ResultTableRow() {
	return (
		<tr className="res-table__tr">
			<td className="res-table__td" data-label="Name: ">
				<span className="res-table__data">John</span>
			</td>
			<td className="res-table__td" data-label="Surname: ">
				<span className="res-table__data">Doe</span>
			</td>
			<td className="res-table__td" data-label="Age: ">
				<span className="res-table__data">36</span>
			</td>
			<td className="res-table__td" data-label="City: ">
				<span className="res-table__data">London</span>
			</td>
			<td className="res-table__td res-table__td_flex" data-label="&nbsp;">
				<span className="d-flex justify-content-around flex-grow-1 res-table__data">
					<Button variant="link" size="sm" className="res-table__edit">Edit</Button>
					<Button variant="link" size="sm" className="res-table__delete">Delete</Button>
				</span>
			</td>
		</tr>
	)
}

export default ResultTableRow
