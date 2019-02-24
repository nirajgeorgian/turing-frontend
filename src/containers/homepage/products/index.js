import React from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { homeAction } from './flux'
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

	render() {
		let { products } = this.state
		return (
			<div className="album py-5 bg-light">
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
							/>
						))}
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchProducts: homeAction
		},
		dispatch
	)

export default withRouter(
	connect(
		(state) => {
			return {
				products: state.home.products
			}
		},
		mapDispatchToProps
	)(Products)
)
