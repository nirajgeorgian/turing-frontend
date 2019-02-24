import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './private_routes'
import LoggedInRoute from './logged_in_routes'
import { LoadableLogin, LoadableSignup, LoadableCart, LoadableHome } from './loadable_routes'

const AppRouter = () => {
	return (
		<Switch>
			<Route exact path="/" component={LoadableHome} />
			<LoggedInRoute exact path="/login" component={LoadableLogin} />
			<LoggedInRoute exact path="/register" component={LoadableSignup} />
			<PrivateRoute exact path="/cart" component={LoadableCart} />
		</Switch>
	)
}

export default AppRouter
