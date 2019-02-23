import React from 'react'
import logo from '../../../logo.svg'

const Item = ({ name, price, ...props }) => {
	return (
		<div className="col-md-4">
			<div className="card mb-4 shadow-sm">
				<img className="card-image-top" src={logo} alt={logo} />
				<div className="card-body">
					<p className="card-text">{name}</p>
					<div className="d-flex justify-content-between align-items-center">
						<div className="btn-group">
							<button type="button" className="btn btn-sm btn-outline-secondary">
								View
							</button>
							<button type="button" className="btn btn-sm btn-outline-secondary">
								Add To Cart
							</button>
						</div>
						<small className="text-muted">₹{price}</small>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Item
