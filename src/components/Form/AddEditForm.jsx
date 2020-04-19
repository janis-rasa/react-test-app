import React from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Formik} from 'formik'
import * as yup from 'yup'
import './AddEditForm.scss'
import AddEditFormField from "./AddEditFormField"

const AddEditForm = (props) => {

	// Define form fields
	const formFields = [
		{label: 'Name', name: 'name', type: 'text'},
		{label: 'Surname', name: 'surname', type: 'text'},
		{label: 'Age', name: 'age', type: 'number'},
		{label: 'City', name: 'city', type: 'text'}
	]

	const handleOnChange = (values) => {
		props.updateFormData(values)
	}
	const handleFormSubmit = ({resetForm}) => {
		if (props.tableRow.tableId) {
			props.editFormData(props.tableRow)
			resetForm()
		} else {
			props.addFormData(props.tableRow.row)
			resetForm()
		}
	}

	const initialValues = () => {
		return Object.keys(props.tableRow).length ? props.tableRow.row : {}
	}

	const alphaCheck = /^[^ ]+/;

	return (
		/* Use Formik and yup for form data validation */
		<Formik
			enableReinitialize
			initialValues={initialValues()}
			validationSchema={
				yup.object({
					name: yup.string().matches(alphaCheck, {
						message: 'Enter a valid Name',
						excludeEmptyString: true
					}).required('Name is required'),
					surname: yup.string().matches(alphaCheck, {
						message: 'Enter a valid Name',
						excludeEmptyString: true
					}).required('Surname is required'),
					age: yup.number().required('Age is required').moreThan(0, 'Age must be greater than 0'),
					city: yup.string().matches(alphaCheck, {
						message: 'Enter a valid City',
						excludeEmptyString: true
					}).required('City is required'),
				})
			}
			onSubmit={handleFormSubmit}
			validate={handleOnChange}
		>
			{({
				  handleChange,
				  handleSubmit,
				  values,
				  touched,
				  errors,
			  }) => (
				<Form
					className="add-form form"
					method="post"
					noValidate
					onSubmit={handleSubmit}
				>
					{/* Render form fields*/}
					{formFields.map(formField => {
						return <AddEditFormField
							key={formField.name}
							formField={formField}
							onChange={handleChange}
							onErrors={errors[formField.name]}
							isValid={touched[formField.name] && !errors[formField.name]}
							value={values[formField.name] ?? ''}
						/>
					})}
					<Button
						type="submit"
						variant={(Object.keys(props.tableRow).length && props.tableRow.tableId) ? "info" : "primary"}
						className="add-form__submit text-uppercase btn-block btn-lg"
					>
						{(Object.keys(props.tableRow).length && props.tableRow.tableId) ? "Edit" : "Add"}
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default AddEditForm