import React from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './private_routes'
import LoggedInRoute from './logged_in_routes'
import {
	LoadableLogin,
	LoadableSignup,
	LoadableCart,
	LoadableHome,
	LoadableProduct,
	LoadableSearch
} from './loadable_routes'

const AppRouter = () => {
	return (
		<Switch>
			<LoggedInRoute exact path="/login" component={LoadableLogin} />
			<LoggedInRoute exact path="/register" component={LoadableSignup} />
			<PrivateRoute exact path="/cart" component={LoadableCart} />
			<Route exact path="/products/:id" component={LoadableProduct} />
			<Route exact path="/" component={LoadableHome} />
			<Route exact path="/search" component={LoadableSearch} />
			<Route exact path="/:id" component={LoadableHome} />
		</Switch>
	)
}

export default AppRouter
