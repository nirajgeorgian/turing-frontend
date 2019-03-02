import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { UncontrolledCarousel } from 'reactstrap'
import { config } from '../../config'

const { images_url } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']
const SearchResult = ({ search: { product } }) => {
	if (product) {
		let firstImage = `${images_url}/${product.image}`
		let secondImage = `${images_url}/${product.image_2}`
		let items = [
			{
				key: 0,
				src: firstImage
			},
			{
				key: 1,
				src: secondImage
			}
		]
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<UncontrolledCarousel items={items} autoPlay={false} indicators={false} interval={false} />
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-md-12">
									<h1>{product.name}</h1>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<span className="label label-primary">Category</span>
									<span className="monospaced">{' French'}</span>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<p class="description">{product.description}</p>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 bottom-rule">
									<h2 class="product-price">₹ {product.price}</h2>
								</div>
							</div>
							<div class="row add-to-cart">
								<div class="col-md-5 product-qty">
									<span class="btn btn-default btn-lg btn-qty">
										<span class="glyphicon glyphicon-plus" aria-hidden="true" />
									</span>
									<input class="btn btn-default btn-lg btn-qty" value="1" />
									<span class="btn btn-default btn-lg btn-qty">
										<span class="glyphicon glyphicon-minus" aria-hidden="true" />
									</span>
								</div>
								<div class="col-md-4">
									<button class="btn btn-lg btn-brand btn-full-width">Add to Cart</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
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
