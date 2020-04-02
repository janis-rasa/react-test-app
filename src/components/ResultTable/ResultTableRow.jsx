import React from 'react'
import Button from 'react-bootstrap/Button'

function ResultTableRow() {
	return (
		<tr className="res-table__tr">
			<td className="res-table__td" data-label="Name: ">John</td>
			<td className="res-table__td" data-label="Surname: ">Doe</td>
			<td className="res-table__td" data-label="Age: ">36</td>
			<td className="res-table__td" data-label="City: ">London</td>
			<td className="res-table__td" data-label="Action: ">
				<div className="d-flex justify-content-around">
					<Button variant="link" size="sm" className="res-table__edit">Edit</Button>
					<Button variant="link" size="sm" className="res-table__delete">Delete</Button>
				</div>
			</td>
		</tr>
	)
}

export default ResultTableRow
