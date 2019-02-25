import React from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { UncontrolledCarousel } from 'reactstrap'

import { productAction } from './flux'
import { config } from '../../config'
const { images_url } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']

class ProductDetail extends React.Component {
	state = {
		productDetail: {}
	}
	async componentDidMount() {
		await this.props.fetchProduct(Number(this.props.match.params.id))
		this.setState({
			productDetail: this.props.product.productDetail
		})
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			productDetail: nextProps.product.productDetail
		})
	}

	render() {
		let { productDetail } = this.state
		if (productDetail.status) {
			return <p>Loading...</p>
		} else {
			// const categories = productDetail.categories
			let firstImage = `${images_url}/${productDetail.image}`
			let secondImage = `${images_url}/${productDetail.image_2}`
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
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<UncontrolledCarousel items={items} autoPlay={false} indicators={false} interval={false} />
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-md-12">
									<h1>{productDetail.name}</h1>
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
									<p class="description">{productDetail.description}</p>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 bottom-rule">
									<h2 class="product-price">₹ {productDetail.price}</h2>
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
			)
		}
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetchProduct: productAction
		},
		dispatch
	)

const Product = connect(
	(state) => {
		return {
			product: state.product
		}
	},
	mapDispatchToProps
)(ProductDetail)

export default withRouter(Product)
