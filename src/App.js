import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AppRouter from './routes'

class App extends Component {
	render() {
		return (
			<>
				<header>
					<p>header</p>
				</header>
				<main>
					<AppRouter />
				</main>
				<footer>
					<p>footer</p>
				</footer>
			</>
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