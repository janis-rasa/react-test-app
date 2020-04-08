import React from 'react'
import Table from 'react-bootstrap/Table'
import './ResultTable.scss'
import ResultTableRow from "./ResultTableRow";
import Button from "react-bootstrap/Button";

const headCellsNames = [
	'Name',
	'Surname',
	'Age',
	'City'
]

export default class ResultTable extends React.Component {

	TableHeadCells = headCellsNames.map(
		cell => <td className="res-table__td res-table__td_head" key={cell}>{cell}</td>
	)

	render() {
		return (
			<div className="table-block" id={'table-block_' + this.props.tableId} data-id={this.props.tableId}>
				<div className="copy-tables">
						<Button
							variant="primary"
							size="sm"
							className="copy-tables__copy"
							onClick={this.props.copyTable.bind(null, this.props.index)}
						>
							Copy table
						</Button>
						{this.props.tableId !== this.props.firstTableKey ? (
							<Button
								variant="borderless"
								size="sm"
								className="mx-3 px-1 copy-tables__remove"
								onClick={this.props.deleteTable.bind(null, this.props.index, this.props.tableId)}
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
				<Table bordered hover className="res-table">
					<thead className="res-table__thead">
					<tr className="res-table__tr res-table__tr_head">
						{this.TableHeadCells}
						<td className="res-table__td res-table__td_head">&nbsp;</td>
					</tr>
					</thead>
					<tbody className="res-table__tbody">
					{this.props.tableData.map(tableRow => {
						return <ResultTableRow
							key={tableRow.id}
							index={this.props.index}
							tableId={this.props.tableId}
							tableRow={tableRow}
							deleteTableRow={this.props.deleteTableRow}
							editTableRow={this.props.editTableRow}
						/>
					})}
					</tbody>
				</Table>
			</div>
		)
	}
}
