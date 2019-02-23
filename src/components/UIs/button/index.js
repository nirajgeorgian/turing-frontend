import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'

const AltButton = ({ color, active, disabled, children, ...props }) => {
	return (
		<div className={'alt-form-btn-div'}>
			<Button large={true} intent="primary" active={active || disabled} disabled={disabled} {...props}>
				{children}
			</Button>
		</div>
	)
}

const { string, bool } = PropTypes
AltButton.propTypes = {
	color: string,
	active: bool,
	type: string,
	disabled: bool
}

export default AltButton
