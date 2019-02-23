import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { homeAction, homeErrorClear } from './flux'

class Homepage extends Component {

	async componentDidMount() {
		let data = await this.props.fetchProducts()
		console.log("Data: ", data)
	}
	render() {
		return (
			<div>
				<h1>Homepage</h1>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
	{
		fetchProducts: homeAction,
		fetchProductsClear: homeErrorClear
	},
	dispatch,
)
const Home = connect(
	(state) => state,
	mapDispatchToProps
)(Homepage)

export default withRouter(Home)
