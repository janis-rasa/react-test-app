import {
	addFormData,
	editFormData,
} from "../../redux/table-reducer"
import {connect} from "react-redux"
import AddEditForm from "./AddEditForm"
import customValidate from "../../common/customValidate/customValidate"
import {reduxForm} from "redux-form"
import React from "react"
import {formFields, tableRowData} from "../../redux/table-selectors";
import {
	AddEditFormMapDispatchPropsType,
	AddEditFormMapStatePropsType,
	FormPropsType,
	TableRowType
} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type PropsType = AddEditFormMapStatePropsType & AddEditFormMapDispatchPropsType

const AddEditFormContainer: React.FC<PropsType> = (props) => {

	const onSubmit = (formData: TableRowType) => {
		if (formData.id) {
			props.editFormData(formData, props.tableRowData)
		} else {
			props.addFormData(formData)
		}
	}

	const initialValues:TableRowType | {}  = Object.keys(props.tableRowData).length ? props.tableRowData.row : {}

	// Checking what the status of the form is: adding data or editing
	const addEdit: number = Object.keys(props.tableRowData).length && props.tableRowData.tableId

	const ReduxForm = reduxForm<TableRowType, FormPropsType>({
		form: 'addEditForm',
		enableReinitialize : true,
		destroyOnUnmount: false,
		initialValues: initialValues,
		asyncValidate: customValidate(props.formFields)
	})(AddEditForm)

	return (
		<ReduxForm
			formFields={props.formFields}
			addEdit={addEdit}
			onSubmit={onSubmit}
		/>
	)
}

const mapStateToProps = (state: AppStateType): AddEditFormMapStatePropsType => {
	return {
		tableRowData: tableRowData(state),
		formFields: formFields(state),
	}
}

export default connect<AddEditFormMapStatePropsType, AddEditFormMapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
	addFormData,
	editFormData
})(AddEditFormContainer)
