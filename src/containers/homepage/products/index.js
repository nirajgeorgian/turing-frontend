import React from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { homeAction } from './flux'
import { addToCartAction } from '../../cart/flux'
import Item from './product'

class Products extends React.Component {
	state = {
		products: [],
		page: 1
	}

	async componentWillReceiveProps(nextProps) {
		if (nextProps.page !== this.state.page) {
			await this.props.fetchProducts(nextProps.page)
			await this.setState({
				page: nextProps.page
			})
		} else {
			this.setState({
				products: nextProps.products.rows,
				page: 1
			})
		}
	}

	// {this.props.cart.error ? (
	// 	<div className="text-center">
	// 		<Alert color="danger">{this.props.cart.error}</Alert>
	// 	</div>
	// ) : null}
	render() {
		let { products } = this.state
		return (
			<div className="container">
				<div className="row">
					{products.map((item, i) => (
						<Item
							key={i}
							productId={item.product_id}
							name={item.product.name}
							price={item.product.price}
							image={item.product.image}
							image_2={item.product.image_2}
							category={item.category.name}
							department={item.category.department.name}
							description={
								item.product.description.length > 35
									? item.product.description.substring(0, 35) + ' ...'
									: item.product.description
							}
							addToCart={this.props.addToCart}
							product={item.product}
						/>
					))}
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchProducts: homeAction,
			addToCart: addToCartAction
		},
		dispatch
	)

export default withRouter(
	connect(
		(state) => {
			return {
				products: state.home.products,
				cart: state.cart
			}
		},
		mapDispatchToProps
	)(Products)
)
