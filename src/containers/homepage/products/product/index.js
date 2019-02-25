import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Badge } from 'reactstrap'
import { withRouter } from 'react-router-dom'

import AltButton from '../../../../components/UIs/button'
import { config } from '../../../../config'
const { images_url } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']

const Item = ({ name, price, image, image_2, productId, description, category, department, ...props }) => {
	let firstImage = `${images_url}/${image}`
	// let nextImage = `${images_url}/${image_2}`
	return (
		<div className="col-md-4 product">
			<Card>
				<CardImg
					top
					width="100%"
					src={firstImage}
					alt={name}
					title={name}
					onClick={() => props.history.push(`products/${productId}`)}
				/>
				<CardBody className="product-content">
					<CardTitle>{name}</CardTitle>
					<CardSubtitle>
						<Badge color="dark">{department}</Badge>
						<strong> / </strong>
						<Badge color="dark">{category}</Badge>
					</CardSubtitle>
					<CardText>{description}</CardText>
				</CardBody>
				<CardBody className="d-flex justify-content-between align-items-center product-content">
					<div className="text-muted">
						<strong>₹ {price}</strong>
					</div>
					<div className="btn-group">
						<AltButton outline onClick={() => props.addToCart(props.product)}>
							Add To Cart
						</AltButton>
					</div>
				</CardBody>
			</Card>
		</div>
	)
}

export default withRouter(Item)
