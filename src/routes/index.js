import React from 'react'
import { Route, Switch } from 'react-router-dom'

// import PrivateRoute from './private_routes'
import LoggedInRoute from './logged_in_routes'
import { LoadableHome } from './loadable_routes'
import { LoadableLogin } from './loadable_routes'

const AppRouter = () => {
	return (
		<Switch>
			<Route exact path="/" component={LoadableHome} />
			<LoggedInRoute exact path="/login" component={LoadableLogin} />
		</Switch>
	)
}

export default AppRouter
