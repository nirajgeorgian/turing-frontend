import React from 'react'
import { Spinner } from 'reactstrap'
import PropTypes from 'prop-types'

const Loading = ({ error, retry, pastDelay }) => {
	if (error) {
		return (
			<div className="alt-loader-page">
				<p>
					Error! <button onClick={retry}>Retry</button>
				</p>
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
				<p>Loading ...</p>
			</div>
		)
	}
}

const { func, bool } = PropTypes
Loading.propTypes = {
	retry: func,
	pastDelay: bool,
	error: bool
}

export default Loading
