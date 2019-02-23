import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const AltButton = ({ active, disabled, children, ...props }) => {
	return (
		<div className={'alt-form-btn-div'}>
			<Button active={active || disabled} disabled={disabled} {...props}>
				{children}
			</Button>
		</div>
	)
}

const { string, bool } = PropTypes
AltButton.propTypes = {
	active: bool,
	type: string,
	disabled: bool
}

export default AltButton
