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
		totalPages: 1,
		times: []
	}

	async componentDidMount() {
		let data = await this.props.fetchProducts()
		let totalProducts = data.payload.count
		let totalPages = parseInt(totalProducts / 12)
		this.setState({
			products: data.payload.rows,
			totalPages,
			times: Array(totalPages).fill(0)
		})
	}

	handleClick = (currentPage) => {
		this.setState(
			{
				currentPage
			},
			() => this.props.history.push(`/${currentPage}`)
		)
	}

	render() {
		const { currentPage, products, totalPages, times } = this.state
		return (
			<div>
				<div className="album py-5 bg-light">
					<div className="container">
						<div className="row">
							{products.map((item, i) => (
								<Item
									key={i}
									name={item.product.name}
									price={item.product.price}
									image={item.product.image}
									image_2={item.product.image_2}
								/>
							))}
						</div>
					</div>
					{totalPages > 1 ? (
						<div>
							<Pagination>
								<PaginationItem disabled={currentPage <= 0}>
									<PaginationLink onClick={(e) => this.handleClick(currentPage - 1)} previous={true} />
								</PaginationItem>
								{times.map((item, i) => (
									<PaginationItem active={i + 1 === currentPage} key={i}>
										<PaginationLink onClick={(e) => this.handleClick(i + 1)}>{i + 1}</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem disabled={totalPages === currentPage}>
									<PaginationLink onClick={(e) => this.handleClick(currentPage + 1)} next={true} />
								</PaginationItem>
							</Pagination>
						</div>
					) : null}
				</div>
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
