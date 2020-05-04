import React from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Formik} from 'formik'
import * as yup from 'yup'
import './AddEditForm.scss'
import AddEditFormField from "./AddEditFormField"

const AddEditForm = (props) => {

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

	const handleYup = Object.fromEntries(
		props.formFields.map(item => [item.name, item.yupObject])
	)

	return (
		/* Use Formik and yup for form data validation */
		<Formik
			enableReinitialize
			initialValues={initialValues()}
			validationSchema={
				yup.object(handleYup)
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
					{props.formFields.map(formField => {
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