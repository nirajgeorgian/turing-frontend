import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import PropTypes from 'prop-types'

const AltTextField = ({
	label,
	name,
	type,
	value,
	classes = 'default',
	placeholder,
	hasError = false,
	error = '',
	...props
}) => {
	const labelField = hasError ? 'error-label' : 'default-label'
	return (
		<FormGroup>
			<Label for={name}>{label}</Label>
			<Input
				invalid={hasError}
				autoComplete="off"
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				{...props}
			/>
			<FormFeedback>{error}</FormFeedback>
		</FormGroup>
	)
}

const { func, string, bool } = PropTypes
AltTextField.propTypes = {
	label: string.isRequired,
	type: string.isRequired,
	name: string.isRequired,
	value: string,
	placeholder: string.isRequired,
	showPassword: bool,
	handleLockClick: func,
	classes: string,
	disabled: bool,
	hasError: bool,
	error: string
}

export default AltTextField
