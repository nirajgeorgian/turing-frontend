import React from 'react'
import logo from '../../../logo.svg'
import { UncontrolledCarousel } from 'reactstrap'
import PropTypes from 'prop-types'

import { config } from '../../../config'
const { images_url } = process.env.NODE_ENV === 'production' ? config['prod'] : config['dev']

const Item = ({ name, price, image, image_2, ...props }) => {
	let firstImage = `${images_url}/${image}`
	let nextImage = `${images_url}/${image_2}`
	let items = [
		{
			src: firstImage
		},
		{
			src: nextImage
		}
	]
	return (
		<div className="col-md-4">
			<div className="card mb-4 shadow-sm">
				<UncontrolledCarousel items={items} autoPlay={false} indicators={false} />
				{/* <img className="card-image-top" src={image_1} alt={logo} /> */}
				<div className="card-body">
					<p className="card-text">{name}</p>
					<div className="d-flex justify-content-between align-items-center">
						<p className="text-muted">
							<b>₹ {price}</b>
						</p>
						<div className="btn-group">
							<button type="button" className="btn btn-sm btn-outline-secondary">
								Add To Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Item

UncontrolledCarousel.propTypes = {
	items: PropTypes.array.isRequired,
	indicators: PropTypes.bool, // default: true
	controls: PropTypes.bool, // default: true
	autoPlay: PropTypes.bool // default: true
}
