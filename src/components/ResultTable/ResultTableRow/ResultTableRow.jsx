import React from 'react'
import Button from 'react-bootstrap/Button'


const ResultTableRow = (props) => {

	const rowRef = React.useRef()

	const buttonsData = [
		{
			action: 'edit',
			text: 'Edit',
			onClick: () => {return props.editTableRow.bind(null, props.tableId, props.tableRow.id, rowRef)}
		},
		{
			action: 'delete',
			text: 'Delete',
			onClick: () => {return props.deleteTableRow.bind(null, props.tableId, props.tableRow.id, rowRef)}
		},
	]

	const TableBodyCells = (tableRow) => {
		const cell = []
		for (let [key, value] of Object.entries(tableRow)) {
			if (key === 'id') {
				continue
			}
			cell.push(
				<td className="res-table__td" data-label={key + ":"} key={key}>
					<span className="res-table__data">{value}</span>
				</td>
			)
		}
		return cell
	}

	const ActionButtons = buttonsData.map( (button, index) =>
		<Button
			variant="link"
			size="sm"
			className={"res-table__" + button.action}
			key={index}
			onClick={button.onClick()}
		>
			{button.text}
		</Button>
	)
	return (
		<tr
			className="res-table__tr"
			id={'row_' + props.tableId + '_' + props.tableRow.id}
			ref={rowRef}
		>
			{/* Get cells with values */}
			{TableBodyCells(props.tableRow)}
			<td className="res-table__td res-table__td_flex" data-label="&nbsp;">
				<span className="d-flex justify-content-around flex-grow-1 res-table__data">
					{ActionButtons}
				</span>
			</td>
		</tr>
	)
}

export default ResultTableRow