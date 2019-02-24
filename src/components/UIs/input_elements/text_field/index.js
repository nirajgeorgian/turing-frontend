import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import PropTypes from 'prop-types'

const AltTextField = ({
	label,
	name,
	type,
	classes = 'default',
	placeholder,
	hasError = false,
	error = '',
	valid,
	...props
}) => {
	return (
		<FormGroup>
			<Label for={name}>{label}</Label>
			<Input
				invalid={hasError}
				autoComplete="off"
				type={type}
				name={name}
				placeholder={placeholder}
				valid={valid}
				{...props}
			/>
			<FormFeedback>{error}</FormFeedback>
		</FormGroup>
	)
}

const { string, bool } = PropTypes
AltTextField.propTypes = {
	label: string.isRequired,
	type: string.isRequired,
	name: string.isRequired,
	placeholder: string,
	classes: string,
	disabled: bool,
	hasError: bool,
	error: string
}

export default AltTextField
