import React from "react";
import Form from 'react-bootstrap/Form'

function AddEditFormField({formField, onChange, onErrors, isValid, value}) {

	return (
			<Form.Group controlId={formField.name} className="add-form__group">
				<Form.Control
					type={formField.type}
					size="lg"
					name={formField.name}
					onChange={onChange}
					isInvalid={!!onErrors}
					isValid={isValid}
					className={value ? ('has-value add-form__input') : 'add-form__input'}
					value={value}
				/>
				<Form.Label size="lg" className="add-form__label">{formField.name}</Form.Label>
				<Form.Control.Feedback type="invalid" className="add-form__invalid">
					<span className="add-form__message">{onErrors}</span>
				</Form.Control.Feedback>
				<Form.Control.Feedback className="add-form__valid">Looks good!</Form.Control.Feedback>
			</Form.Group>
	)

}

export default AddEditFormField
