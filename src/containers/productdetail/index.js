import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { productAction } from './flux'

class ProductDetail extends React.Component {
	state = {
		productDetail: {}
	}
	async componentDidMount() {
		await this.props.fetchProduct(Number(this.props.match.params.id))
		let { product } = this.props
		console.log(product)
	}
	render() {
		return <div>Rohan</div>
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchProduct: productAction
		},
		dispatch
	)

export default withRouter(
	connect(
		(state) => {
			return {
				product: state.product.ProductDetail
			}
		},
		mapDispatchToProps
	)(ProductDetail)
)
