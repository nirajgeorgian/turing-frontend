import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AppRouter from './routes'
import AppNavbar from './containers/navbar'
import AppFooter from './containers/footer'

class App extends Component {
	render() {
		return (
			<div>
				<AppNavbar isAuthenticated={true} />
				<main>
					<AppRouter />
				</main>
				<AppFooter />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		state
	}
}
const mapDispatchToAction = (dispatch) => {
	return bindActionCreators({}, dispatch)
}
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToAction
	)(App)
)
