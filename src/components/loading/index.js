import React from 'react'
import { Spinner } from 'reactstrap'
import PropTypes from 'prop-types'

import AltButton from '../UIs/button'

const Loading = ({ error, retry, pastDelay }) => {
	if (error) {
		return (
			<div className="alt-loader-page">
				<AltButton onClick={retry} color="link">
					Error Occured. Please Retry
				</AltButton>
			</div>
		)
	} else if (pastDelay) {
		return (
			<div className="alt-loader-page">
				<Spinner size="lg" type="grow" color="dark" />
			</div>
		)
	} else {
		return (
			<div className="alt-loader-page">
				<Spinner size="lg" type="grow" color="dark" />
			</div>
		)
	}
}

const { func, bool, object } = PropTypes
Loading.propTypes = {
	retry: func,
	pastDelay: bool,
	error: object
}

export default Loading
