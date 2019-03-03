import React from 'react'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { homeAction } from './flux'
import { addToCartAction } from '../../cart/flux'
import Item from './product'
import FilterBy from '../filter_by'

class Products extends React.Component {
	state = {
		products: [],
		page: 1
	}
	async componentWillReceiveProps(nextProps) {
		if (
			nextProps.page !== this.state.page ||
			this.props.filter.category !== nextProps.filter.category ||
			this.props.filter.department !== nextProps.filter.department
		) {
			const { category, department } = await this.props.filter
			const filterBy =
				category && department ? `&department_name=${decodeURI(department)}&category_name=${decodeURI(category)}` : ''
			await this.props.fetchProducts(`${nextProps.page}${filterBy}`)
			await this.setState({
				page: nextProps.page,
				products: this.props.products.rows
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
			<div>
				<div>
					<FilterBy />
				</div>
				<div className="container">
					<div className="row">
						{products.map((item, i) => (
							<Item
								key={`${i}-${item.product.name}`}
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
const mapStateToProps = (state) => {
	return {
		products: state.home.products,
		cart: state.cart,
		filter: state.filter
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Products)
)
