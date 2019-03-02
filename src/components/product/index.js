import React from 'react'
import { Container, UncontrolledCarousel, Row, Col } from 'reactstrap'
import { config } from '../../config'

const { images_url } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']
const SingleProduct = ({ product }) => {
	let firstImage = `${images_url}/${product.image}`
	let secondImage = `${images_url}/${product.image_2}`
	let items = [
		{
			key: `0-${product.image}`,
			src: firstImage,
			caption: ''
		},
		{
			key: `1-${product.image_2}`,
			src: secondImage,
			caption: ''
		}
	]
	return (
		<Container>
			<Row>
				<Col md="6">
					<UncontrolledCarousel items={items} autoPlay={false} indicators={false} interval={false} />
				</Col>
				<Col md="6">
					<Row>
						<Col md="12">
							<h1>{product.name}</h1>
						</Col>
					</Row>
					<Row>
						<Col md="12">
							<span className="label label-primary">Category</span>
							<span className="monospaced">{' French'}</span>
						</Col>
					</Row>
					<Row>
						<Col md="12">
							<p className="description">{product.description}</p>
						</Col>
					</Row>
					<Row>
						<Col md="12" className="bottom-rule">
							<h2 className="product-price">₹ {product.price}</h2>
						</Col>
					</Row>
					<Row className="row add-to-cart">
						<Col md="5" className="product-qty">
							<span className="btn btn-default btn-lg btn-qty">
								<span className="glyphicon glyphicon-plus" aria-hidden="true" />
							</span>
							<input className="btn btn-default btn-lg btn-qty" defaultValue="1" />
							<span className="btn btn-default btn-lg btn-qty">
								<span className="glyphicon glyphicon-minus" aria-hidden="true" />
							</span>
						</Col>
						<Col md="4">
							<button className="btn btn-lg btn-brand btn-full-width">Add to Cart</button>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}

export default SingleProduct
