import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import SingleProduct from '../../components/product'

const SearchResult = ({ search: { product } }) => {
	if (product) {
		return <SingleProduct product={product} />
	} else {
		return <div>no product available ...</div>
	}
}

const mapStateToProps = (state) => {
	return {
		search: state.search
	}
}
export default withRouter(
	connect(
		mapStateToProps,
		null
	)(SearchResult)
)
