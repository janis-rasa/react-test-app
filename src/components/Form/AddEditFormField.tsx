import React from "react";
import Form from 'react-bootstrap/Form'
import {WrappedFieldProps} from "redux-form";

type PropsType = {
	type: string
	label: string
}

const AddEditFormField: React.FC<PropsType & WrappedFieldProps> = ({input, meta, ...props}) => {

	const [hasValue, setHasValue] = React.useState<string>('')

	const handleFieldClassName = () => {
		if (input.value) {
			setTimeout(() => setHasValue(' has-value'), 25)
			return () => clearTimeout()
		} else {
			setHasValue('')
		}
	}

	React.useEffect(
		() => {
			handleFieldClassName()
		}
	)

	return (
			<Form.Group controlId={input.name} className="add-form__group">
				<Form.Control
					type={props.type}
					className={`add-form__input ${hasValue}`}
					size="lg"
					isInvalid={!!(meta.touched && meta.error)}
					isValid={meta.touched && !meta.error}
					{...input}
				/>
				<Form.Label className="add-form__label">{props.label}</Form.Label>
				<Form.Control.Feedback type="invalid" className="add-form__invalid">
					<span className="add-form__message">{meta.error}</span>
				</Form.Control.Feedback>
			</Form.Group>
	)
}

export default AddEditFormField