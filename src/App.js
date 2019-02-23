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
			<div className="d-flex flex-column h-100">
				<AppNavbar isAuthenticated={true} />
				<main role="main" className="flex-shrink-0">
					<div className="container">
						<AppRouter />
					</div>
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
