import * as yup from "yup";

const customValidate = formFields => values => {

	const schema = yup.object().shape(Object.fromEntries(
		formFields.map(item => [item.name, item.yupObject])
	))

	return new Promise((resolve, reject) => {
		schema.validate(values, {abortEarly: false})
			.then(() => {
				resolve()
			})
			.catch(errors => {
				let reduxFormErrors = {}
				errors.inner.forEach(error => {
					reduxFormErrors[error.path] = error.message
				})
				reject(reduxFormErrors)
			})
	})

}

export default customValidate