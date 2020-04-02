import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Context from "../../context";

function ResultTableRow(props) {

	const { removeTableRow, editTableRow } = useContext(Context)

	return (
		<tr className="res-table__tr">
			<td className="res-table__td" data-label="Name: ">
				<span className="res-table__data">{props.tableRow.Name}</span>
			</td>
			<td className="res-table__td" data-label="Surname: ">
				<span className="res-table__data">{props.tableRow.Surname}</span>
			</td>
			<td className="res-table__td" data-label="Age: ">
				<span className="res-table__data">{props.tableRow.Age}</span>
			</td>
			<td className="res-table__td" data-label="City: ">
				<span className="res-table__data">{props.tableRow.City}</span>
			</td>
			<td className="res-table__td res-table__td_flex" data-label="&nbsp;">
				<span className="d-flex justify-content-around flex-grow-1 res-table__data">
					<Button
						variant="link"
						size="sm"
						className="res-table__edit"
						onClick={editTableRow.bind(null, props.tableRow.id)}
					>
						Edit
					</Button>
					<Button
						variant="link"
						size="sm"
						className="res-table__delete"
						onClick={removeTableRow.bind(null, props.tableRow.id)}
					>
						Delete
					</Button>
				</span>
			</td>
		</tr>
	)
}

export default ResultTableRow
