import React from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './AddEditForm.scss'
import AddEditFormField from "./AddEditFormField"
import {Field, InjectedFormProps} from "redux-form";
import {FormFieldsType, FormPropsType, TableRowType} from "../../types/types";

type AddEditForm = {
	formFields: Array<FormFieldsType>
	addEdit: number
}

type PropsType = AddEditForm

const AddEditForm: React.FC<InjectedFormProps<TableRowType, FormPropsType> & PropsType> = (props) => {

	const {pristine, submitting, handleSubmit} = props;
	return (
		<Form
			className="add-form form"
			method="post"
			onSubmit={handleSubmit}
		>
			{/* Render form fields from formFields array*/}
			{props.formFields.map(formField => {
				return <Field
					component={AddEditFormField}
					key={formField.name}
					name={formField.name}
					type={formField.type}
					label={formField.label}
				/>
			})}
			<Button
				type="submit"
				variant={props.addEdit ? "info" : "primary"}
				className="add-form__submit text-uppercase btn-block btn-lg"
				disabled={pristine || submitting}
			>
				{props.addEdit ? "Edit" : "Add"}
			</Button>
		</Form>
	)
}

export default AddEditForm