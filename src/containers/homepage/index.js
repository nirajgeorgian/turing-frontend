import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { homeAction, homeErrorClear } from './products/flux'
import Products from './products/index'

class Homepage extends Component {
	state = {
		currentPage: 1,
		totalPages: 1,
		times: [],
		products: []
	}

	async componentDidMount() {
		const { category, department } = this.props.filter
		const filterBy =
			category && department ? `&department_name=${decodeURI(department)}&category_name=${decodeURI(category)}` : ''
		await this.props.fetchProducts(`1${filterBy}`)
		let { products } = this.props
		let totalProducts = products.count
		let totalPages = parseInt(totalProducts / 12)
		await this.setState({
			products: products.rows,
			totalPages,
			times: Array(totalPages).fill(0),
			currentPage: this.props.match.params.id ? Number(this.props.match.params.id) : 1
		})
	}

	// async componentWillReceiveProps(nextProps) {
	// 	console.log("Here: ", nextProps)
	// 	// const { category, department } = this.props.filter
	// 	// const filterBy =
	// 	// 	category && department ? `&department_name=${decodeURI(department)}&category_name=${decodeURI(category)}` : ''
	// 	// await this.props.fetchProducts(`1${filterBy}`)
	// 	// let { products } = this.props
	// 	// let totalProducts = products.count
	// 	// let totalPages = parseInt(totalProducts / 12)
	// 	// await this.setState({
	// 	// 	products: products.rows,
	// 	// 	totalPages,
	// 	// 	times: Array(totalPages).fill(0),
	// 	// 	currentPage: this.props.match.params.id ? Number(this.props.match.params.id) : 1
	// 	// })
	// }

	handleClick = async (currentPage) => {
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
				<div className="row">
					<Products page={currentPage} products={products} />
				</div>
				{totalPages > 1 ? (
					<div>
						<Pagination>
							<PaginationItem disabled={currentPage <= 1}>
								<PaginationLink onClick={(_) => this.handleClick(currentPage - 1)} previous={true} />
							</PaginationItem>
							{times.map((_, i) => (
								<PaginationItem active={i + 1 === currentPage} key={i}>
									<PaginationLink onClick={(_) => this.handleClick(i + 1)}>{i + 1}</PaginationLink>
								</PaginationItem>
							))}
							<PaginationItem disabled={totalPages === currentPage}>
								<PaginationLink onClick={(_) => this.handleClick(currentPage + 1)} next={true} />
							</PaginationItem>
						</Pagination>
					</div>
				) : null}
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
	(state) => {
		return {
			products: state.home.products,
			filter: state.filter
		}
	},
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
