import React from 'react'
import Button from 'react-bootstrap/Button'


const ResultTableRow = (props) => {

	const rowRef = React.useRef()

	const handleDeleteRow = () => {
		// Adding class for animation
		rowRef.current.classList.add("closing")
		setTimeout(() => {
			props.deleteTableRow(props.tableId, props.rowData.id)
		}, 250)
	}

	const handleEditRow = () => {
		props.editTableRow(props.tableId, props.rowData.id, props.tableRef)
	}

	const buttonsData = [
		{
			action: 'edit',
			text: 'Edit',
			onClick: () => {handleEditRow()}
		},
		{
			action: 'delete',
			text: 'Delete',
			onClick: () => {handleDeleteRow()}
		},
	]

	const ActionButtons = buttonsData.map( (button, index) =>
		<Button
			variant="link"
			size="sm"
			className={"res-table__" + button.action}
			key={index}
			onClick={button.onClick}
		>
			{button.text}
		</Button>
	)
	return (
		<tr
			className="res-table__tr"
			id={'row_' + props.tableId + '_' + props.rowData.id}
			ref={rowRef}
		>
			<td className="res-table__td" data-label="Name :">
				<span className="res-table__data">{props.rowData.name}</span>
			</td>
			<td className="res-table__td" data-label="Surname :">
				<span className="res-table__data">{props.rowData.surname}</span>
			</td>
			<td className="res-table__td" data-label="Age :">
				<span className="res-table__data">{props.rowData.age}</span>
			</td>
			<td className="res-table__td" data-label="City :">
				<span className="res-table__data">{props.rowData.city}</span>
			</td>
			<td className="res-table__td res-table__td_flex" data-label="&nbsp;">
				<span className="d-flex justify-content-around flex-grow-1 res-table__data">
					{ActionButtons}
				</span>
			</td>
		</tr>
	)
}

export default ResultTableRow