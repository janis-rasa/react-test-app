import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as yup from 'yup';
import './AddEditForm.scss'
import AddEditFormField from "./AddEditFormField";

function AddEditForm() {

	const formFields = [
		{name: 'Name', type: 'text'},
		{name: 'Surname', type: 'text'},
		{name: 'Age', type: 'number'},
		{name: 'City', type: 'text'}
	]

	function handleLabelToggle(e) {
		if (e.target.value.trim()) {
			e.target.classList.add("has-value");
		} else {
			e.target.classList.remove("has-value");
		}
	}

	return (
		<Formik
			initialValues={{}}
			validationSchema={yup.object({
				Name: yup.string().required(),
				Surname: yup.string().required(),
				Age: yup.number().required(),
				City: yup.string().required(),
			})}
			onSubmit={console.log}
		>
			{({
				  handleSubmit,
				  handleChange,
				  values,
				  touched,
				  errors,
			  }) => (
					<Form className="add-form form" method="post" noValidate onSubmit={handleSubmit}>
						{formFields.map(formField => {
							return <AddEditFormField
								key={formField.name}
								formField={formField}
								onChange={e => {handleChange(e); handleLabelToggle(e)}}
								onErrors={errors[formField.name]}
								isValid={touched[formField.name] && !errors[formField.name]}
								value={values[formField.name]}
							/>
						})}
						<Button type="submit" variant="primary" className="add-form__submit text-uppercase font-weight-bold btn-block btn-lg">Add</Button>
					</Form>
				)}
		</Formik>
	)
}

export default AddEditForm
