import React from 'react'
import { Field, reduxForm } from 'redux-form'

let CustomForm = props => {
	const { handleSubmit } = props
	return (
		<form onSubmit={handleSubmit}>
		<div>
		<label htmlFor="title">Title</label>
		<Field name="title" component="input" type="text" />
		</div>
		<div>
		<label htmlFor="description">Description</label>
		<Field name="description" component="input" type="text" />
		</div>
		<button type="submit">Submit</button>
		</form>
		)
}

CustomForm = reduxForm()(CustomForm)

export default CustomForm