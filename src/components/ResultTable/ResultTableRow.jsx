import React from 'react'
import Button from 'react-bootstrap/Button'


export default class ResultTableRow extends React.Component {

	TableBodyCells = (tableRow) => {
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

	render() {
		return (
			<tr className="res-table__tr" id={'row_' + this.props.tableId + '_' + this.props.tableRow.id}>
				{/* Get cells with values */}
				{this.TableBodyCells(this.props.tableRow)}
				<td className="res-table__td res-table__td_flex" data-label="&nbsp;">
					<span className="d-flex justify-content-around flex-grow-1 res-table__data">
						<Button
							variant="link"
							size="sm"
							className="res-table__edit"
							onClick={this.props.editTableRow.bind(null, this.props.index, this.props.tableRow.id)}
						>
							Edit
						</Button>
						<Button
							variant="link"
							size="sm"
							className="res-table__delete"
							onClick={this.props.deleteTableRow.bind(null, this.props.index, this.props.tableId, this.props.tableRow.id)}
						>
							Delete
						</Button>
					</span>
				</td>
			</tr>
		)
	}
}
