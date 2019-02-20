import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const LoggedInRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			return rest.loggedIn !== true ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/welcome',
						state: { from: props.location }
					}}
				/>
			)
		}}
	/>
)

function mapStateToProps(state) {
	return {
		loggedIn: state.login.loggedIn
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		null
	)(LoggedInRoute)
)
