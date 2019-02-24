import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import PropTypes from 'prop-types'

const AltSelectField = ({ label, name, classes = 'default', hasError = false, error = '', options, ...props }) => {
	return (
		<FormGroup>
			<Label for={name}>{label}</Label>
			<Input invalid={hasError} autoComplete="off" type="select" name={name} {...props}>
				{options.map((option) => (
					<option key={option}>{option}</option>
				))}
			</Input>
			<FormFeedback>{error}</FormFeedback>
		</FormGroup>
	)
}

const { string, bool } = PropTypes
AltSelectField.propTypes = {
	label: string.isRequired,
	name: string.isRequired,
	classes: string,
	hasError: bool,
	error: string
}

export default AltSelectField
