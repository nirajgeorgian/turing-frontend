import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

import { homeAction, homeErrorClear } from './flux'

import Item from './product'

class Homepage extends Component {
	state = {
		products: [],
		currentPage: 0,
		times: [0, 0, 0, 0, 0]
	}

	async componentDidMount() {
		let data = await this.props.fetchProducts()
		this.setState({
			products: data.payload
		})
	}

	handleClick = (e, currentPage) => {
		// e.preventdefault()
		this.setState({
			currentPage
		})
	}

	render() {
		const { currentPage, times, products } = this.state
		return (
			<div className="album py-5 bg-light">
				<div className="container">
					<div className="row">
						{products.map((item, i) => (
							<Item key={i} name={item.product.name} price={item.product.price} />
						))}
					</div>
				</div>
				{/* <Pagination>
					<PaginationItem disabled={currentPage <= 0}>
						<PaginationLink onClick={(e) => this.handleClick(e, currentPage - 1)} previous={true} href="#" />
					</PaginationItem>
					{times.map((item, i) => (
						<PaginationItem active={i === currentPage} key={i}>
							<PaginationLink onClick={(e) => this.handleClick(e, i)} href="#">
								{i + 1}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationItem disabled={currentPage >= this.pagesCount - 1}>
						<PaginationLink onClick={(e) => this.handleClick(e, currentPage + 1)} next href="#" />
					</PaginationItem>
				</Pagination> */}
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchProducts: homeAction,
			fetchProductsClear: homeErrorClear
		},
		dispatch
	)
const Home = connect(
	(state) => state,
	mapDispatchToProps
)(Homepage)

export default withRouter(Home)

Pagination.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	listClassName: PropTypes.string,
	cssModule: PropTypes.object,
	size: PropTypes.string,
	tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	listTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	'aria-label': PropTypes.string
}

PaginationItem.propTypes = {
	active: PropTypes.bool,
	children: PropTypes.node,
	className: PropTypes.string,
	cssModule: PropTypes.object,
	disabled: PropTypes.bool,
	tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

PaginationLink.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	cssModule: PropTypes.object,
	next: PropTypes.bool,
	previous: PropTypes.bool,
	first: PropTypes.bool,
	last: PropTypes.bool,
	tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	'aria-label': PropTypes.string
}
