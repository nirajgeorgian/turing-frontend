import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { productAction } from './flux'
import SingleProduct from '../../components/product'

class ProductDetail extends React.Component {
	state = {
		productDetail: {},
		loading: true
	}
	async componentDidMount() {
		await this.props.fetchProduct(Number(this.props.match.params.id))
		await this.setState({
			productDetail: this.props.product.productDetail,
			loading: false
		})
	}
	render() {
		let { productDetail, loading } = this.state
		if (loading) {
			return <p>Loading...</p>
		} else {
			return <SingleProduct product={productDetail} />
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			fetchProduct: productAction
		},
		dispatch
	)
}
const mapStateToProps = (state) => {
	return {
		product: state.product
	}
}

const Product = connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductDetail)
export default withRouter(Product)
