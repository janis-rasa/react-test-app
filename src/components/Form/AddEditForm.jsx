import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Formik} from 'formik';
import * as yup from 'yup';
import './AddEditForm.scss'
import AddEditFormField from "./AddEditFormField";

const AddEditForm = (props) => {

	// Define form fields
	const formFields = [
		{name: 'Name', type: 'text'},
		{name: 'Surname', type: 'text'},
		{name: 'Age', type: 'number'},
		{name: 'City', type: 'text'}
	]

	function handleLabelToggle(e) {
		if (e.target.value.trim()) {
			e.target.classList.add("has-value")
		} else {
			e.target.classList.remove("has-value")
		}
	}

	return (
		/* Use Formik and yup for form data validation */
		<Formik
			enableReinitialize
			initialValues={Object.keys(props.editRow).length ? props.editRow.row : {}}
			validationSchema={yup.object({
				Name: yup.string().required(),
				Surname: yup.string().required(),
				Age: yup.number().required(),
				City: yup.string().required(),
			})}
			onSubmit={(values, {resetForm}) => {
				props.addFormData(values)
				resetForm()
			}}
		>
			{({
				  handleSubmit,
				  handleChange,
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
							onChange={e => {
								handleChange(e);
								handleLabelToggle(e)
							}}
							onErrors={errors[formField.name]}
							isValid={touched[formField.name] && !errors[formField.name]}
							value={values[formField.name] ?? ''}
						/>
					})}
					<Button
						type="submit"
						variant={Object.keys(props.editRow).length ? "info" : "primary"}
						className="add-form__submit text-uppercase btn-block btn-lg"
					>
						{Object.keys(props.editRow).length ? "Edit" : "Add"}
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default AddEditForm