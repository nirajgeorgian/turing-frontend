import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AppRouter from './routes'
import AppNavbar from './containers/navbar'
import AppFooter from './containers/footer'
import { logoutAction } from './containers/account/login/flux'

class App extends Component {
	render() {
		const {
			login: { loggedIn }
		} = this.props
		return (
			<div className="d-flex flex-column h-100">
				<AppNavbar isAuthenticated={loggedIn} logout={this.props.logoutAction} />
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
		login: state.login
	}
}
const mapDispatchToAction = (dispatch) => {
	return bindActionCreators({ logoutAction }, dispatch)
}
export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToAction
	)(App)
)
