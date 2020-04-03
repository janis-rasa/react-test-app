import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as yup from 'yup';
import './AddEditForm.scss'
import AddEditFormField from "./AddEditFormField";

// Watching input for data to hide placeholder
function handleLabelToggle(e) {
	if (e.target.value.trim()) {
		e.target.classList.add("has-value")
	} else {
		e.target.classList.remove("has-value")
	}
}

// Define form fields
const formFields = [
	{name: 'id', type: 'hidden'},
	{name: 'Name', type: 'text'},
	{name: 'Surname', type: 'text'},
	{name: 'Age', type: 'number'},
	{name: 'City', type: 'text'}
];


export default class AddEditForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			submitForm: false,
			editForm: false,
			formValues: {}
		}
	}

	submitValues = (values) => {
		this.props.addFromData(values)
	}

	componentDidUpdate = (prevProps) => {
		if (this.props.editRow.length
			&& prevProps.editRow.length
			&& (this.props.editRow[1].id !== prevProps.editRow[1].id)
		) {
			this.setState({
				editForm: true
			})
		}
	}

	render() {
		return (
			/* Use Formik and yup for form data validation */
			<Formik
				enableReinitialize
				initialValues={this.props.editRow.length ? this.props.editRow[1] : {}}
				validationSchema={yup.object({
					Name: yup.string().required(),
					Surname: yup.string().required(),
					Age: yup.number().required(),
					City: yup.string().required(),
				})}
				onSubmit={(values, {resetForm}) => {
					this.submitValues(values);
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
					<Form className="add-form form" method="post" noValidate onSubmit={handleSubmit}>
						{/* Render for fields*/}
						{formFields.map(formField => {
							if (formField.type === 'hidden') {
								return <input
									type={formField.type}
									name={formField.name}
									key={formField.name}
									value={values[formField.name] ?? ''}
								/>
							} else {
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
							}
						})}
						<Button
							type="submit"
							variant={this.props.editRow.length ? "info" : "primary" }
							className="add-form__submit text-uppercase btn-block btn-lg"
						>
							{this.props.editRow.length ? "Edit" : "Add" }
						</Button>
					</Form>
				)}
			</Formik>
		)
	}
}
