import {
	addFormDataActionCreator,
	editFormDataActionCreator,
	updateFormFieldsActionCreator
} from "../../redux/table-reducer";
import {connect} from "react-redux";
import AddEditForm from "./AddEditForm";

const mapStateToProps = (state) => {
	return {
		tableRow: state.tablesData.tableRow,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addFormData: (values) => {
			dispatch(addFormDataActionCreator(values))
		},
		editFormData: (values, tableRow) => {
			dispatch(editFormDataActionCreator(values, tableRow))
		},
		updateFormData: (values) => {
			dispatch(updateFormFieldsActionCreator(values))
		}
	}
}

const AddEditFormContainer = connect(mapStateToProps,mapDispatchToProps)(AddEditForm)

export default AddEditFormContainer
